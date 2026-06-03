import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import {
  buildPaginationMeta,
  getSkipTake,
  type PaginatedResult,
} from '../common/dto/pagination.dto.js';
import { InspectionStatus, NotificationType } from '../common/prisma-enums.js';
import { MailerService } from '../mailer/mailer.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInspectionDto } from './dto/create-inspection.dto.js';
import { QueryInspectionDto } from './dto/query-inspection.dto.js';
import { UpdateInspectionDto } from './dto/update-inspection.dto.js';

const inspectionInclude = {
  extinguisher: {
    select: { id: true, serialNumber: true, location: true, type: true },
  },
  scheduledBy: { select: { id: true, firstName: true, lastName: true } },
  inspector: { select: { id: true, firstName: true, lastName: true } },
} as const;

@Injectable()
export class InspectionsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly mailer: MailerService,
  ) {}

  private async notifyInspectorAssigned(
    inspectorId: string,
    extinguisher: { id: string; serialNumber: string; location: string },
    scheduledAt: Date,
  ) {
    await this.notifications.createNotification({
      userId: inspectorId,
      type: NotificationType.INSPECTION_SCHEDULED,
      message: `You have been assigned an inspection for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}) on ${scheduledAt.toISOString()}.`,
      extinguisherId: extinguisher.id,
      emailSubject: 'FEMS — New inspection assigned',
      sendEmail: this.mailer.isConfigured,
    });
  }

  async create(dto: CreateInspectionDto, currentUser: AuthUser) {
    const extinguisher = await this.prisma.fireExtinguisher.findUnique({
      where: { id: dto.extinguisherId },
    });
    if (!extinguisher) {
      throw new NotFoundException(
        `Extinguisher ${dto.extinguisherId} not found`,
      );
    }

    // USER role can only request inspections for extinguishers assigned to them
    if (
      currentUser.role === 'USER' &&
      extinguisher.ownerId !== currentUser.id
    ) {
      throw new ForbiddenException(
        'You can only request inspections for your own extinguishers',
      );
    }

    if (dto.inspectorId) {
      const inspector = await this.prisma.user.findUnique({
        where: { id: dto.inspectorId },
      });
      if (!inspector) {
        throw new NotFoundException(`Inspector ${dto.inspectorId} not found`);
      }
    }

    // USER role creates a PENDING request; ADMIN/INSPECTOR create SCHEDULED directly
    const initialStatus =
      currentUser.role === 'USER'
        ? InspectionStatus.PENDING
        : InspectionStatus.SCHEDULED;

    const inspection = await this.prisma.inspection.create({
      data: {
        extinguisherId: dto.extinguisherId,
        scheduledById: currentUser.id,
        inspectorId: dto.inspectorId ?? null,
        scheduledAt: new Date(dto.scheduledAt),
        status: initialStatus,
        notes: dto.notes ?? null,
      },
      include: inspectionInclude,
    });

    const sendEmail = this.mailer.isConfigured;

    if (initialStatus === InspectionStatus.PENDING) {
      await this.notifications.createNotification({
        userId: currentUser.id,
        type: NotificationType.INSPECTION_SCHEDULED,
        message: `Your inspection request for ${extinguisher.serialNumber} (${extinguisher.location}) has been submitted and is pending review.`,
        extinguisherId: extinguisher.id,
        emailSubject: 'FEMS — Inspection request submitted',
        sendEmail,
      });
    }

    const message = `Inspection scheduled for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}) on ${inspection.scheduledAt.toISOString()}.`;

    if (dto.inspectorId) {
      await this.notifyInspectorAssigned(
        dto.inspectorId,
        extinguisher,
        inspection.scheduledAt,
      );
    }

    await this.notifications.notifyAdmins({
      type: NotificationType.INSPECTION_SCHEDULED,
      message,
      extinguisherId: extinguisher.id,
      emailSubject: 'FEMS — Inspection scheduled',
      sendEmail,
    });

    return inspection;
  }

  async findAll(
    query: QueryInspectionDto,
    currentUser: AuthUser,
  ): Promise<PaginatedResult<unknown>> {
    const { skip, take, page, limit } = getSkipTake(query.page, query.limit);

    // USER role only sees their own inspection requests
    const userFilter =
      currentUser.role === 'USER' ? { scheduledById: currentUser.id } : {};

    const where = {
      ...userFilter,
      ...(query.status ? { status: query.status } : {}),
      ...(query.extinguisherId ? { extinguisherId: query.extinguisherId } : {}),
      ...(query.inspectorId ? { inspectorId: query.inspectorId } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.inspection.findMany({
        where,
        include: inspectionInclude,
        orderBy: { scheduledAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.inspection.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, page, limit) };
  }

  async findOne(id: string) {
    const inspection = await this.prisma.inspection.findUnique({
      where: { id },
      include: {
        ...inspectionInclude,
        maintenanceLogs: { orderBy: { actionDate: 'desc' } },
      },
    });
    if (!inspection) {
      throw new NotFoundException(`Inspection ${id} not found`);
    }
    return inspection;
  }

  async approve(id: string, dto: UpdateInspectionDto) {
    const current = await this.prisma.inspection.findUnique({
      where: { id },
      include: {
        extinguisher: {
          select: { id: true, serialNumber: true, location: true },
        },
      },
    });
    if (!current) {
      throw new NotFoundException(`Inspection ${id} not found`);
    }
    if (current.status !== InspectionStatus.PENDING) {
      throw new BadRequestException(
        'Only PENDING inspection requests can be approved',
      );
    }

    const assignedInspectorId = dto.inspectorId ?? current.inspectorId ?? null;

    const updated = await this.prisma.inspection.update({
      where: { id },
      data: {
        status: InspectionStatus.SCHEDULED,
        inspectorId: assignedInspectorId,
        notes: dto.notes ?? current.notes,
      },
      include: inspectionInclude,
    });

    if (current.scheduledById) {
      await this.notifications.createNotification({
        userId: current.scheduledById,
        type: NotificationType.INSPECTION_SCHEDULED,
        message: `Your inspection request for extinguisher ${current.extinguisher.serialNumber} (${current.extinguisher.location}) has been approved and scheduled.`,
        extinguisherId: current.extinguisherId,
        emailSubject: 'FEMS — Inspection request approved',
        sendEmail: this.mailer.isConfigured,
      });
    }

    if (
      assignedInspectorId &&
      assignedInspectorId !== current.inspectorId
    ) {
      await this.notifyInspectorAssigned(
        assignedInspectorId,
        current.extinguisher,
        updated.scheduledAt,
      );
    }

    return updated;
  }

  async update(id: string, dto: UpdateInspectionDto) {
    const current = await this.prisma.inspection.findUnique({
      where: { id },
      include: {
        extinguisher: {
          select: { id: true, serialNumber: true, location: true },
        },
      },
    });
    if (!current) {
      throw new NotFoundException(`Inspection ${id} not found`);
    }

    if (dto.inspectorId) {
      const inspector = await this.prisma.user.findUnique({
        where: { id: dto.inspectorId },
      });
      if (!inspector) {
        throw new NotFoundException(`Inspector ${dto.inspectorId} not found`);
      }
    }

    const completedAt =
      dto.status === InspectionStatus.COMPLETED
        ? (current.completedAt ?? new Date())
        : undefined;

    const updated = await this.prisma.inspection.update({
      where: { id },
      data: {
        status: dto.status,
        result: dto.result,
        notes: dto.notes,
        inspectorId: dto.inspectorId,
        completedAt,
      },
      include: inspectionInclude,
    });

    const newInspectorId =
      dto.inspectorId !== undefined ? dto.inspectorId : current.inspectorId;

    if (newInspectorId && newInspectorId !== current.inspectorId) {
      await this.notifyInspectorAssigned(
        newInspectorId,
        current.extinguisher,
        updated.scheduledAt,
      );
    }

    return updated;
  }

  async remove(id: string) {
    const current = await this.prisma.inspection.findUnique({ where: { id } });
    if (!current) {
      throw new NotFoundException(`Inspection ${id} not found`);
    }
    await this.prisma.inspection.delete({ where: { id } });
    return { message: 'Inspection deleted successfully' };
  }
}
