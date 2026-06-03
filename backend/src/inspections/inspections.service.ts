import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(dto: CreateInspectionDto, currentUserId: string) {
    const extinguisher = await this.prisma.fireExtinguisher.findUnique({
      where: { id: dto.extinguisherId },
    });
    if (!extinguisher) {
      throw new NotFoundException(
        `Extinguisher ${dto.extinguisherId} not found`,
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

    const inspection = await this.prisma.inspection.create({
      data: {
        extinguisherId: dto.extinguisherId,
        scheduledById: currentUserId,
        inspectorId: dto.inspectorId ?? null,
        scheduledAt: new Date(dto.scheduledAt),
        status: InspectionStatus.SCHEDULED,
        notes: dto.notes ?? null,
      },
      include: inspectionInclude,
    });

    const message = `Inspection scheduled for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}) on ${inspection.scheduledAt.toISOString()}.`;
    const sendEmail = this.mailer.isConfigured;

    if (dto.inspectorId) {
      await this.notifications.createNotification({
        userId: dto.inspectorId,
        type: NotificationType.INSPECTION_SCHEDULED,
        message,
        extinguisherId: extinguisher.id,
        emailSubject: 'FEMS — New inspection assigned',
        sendEmail,
      });
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

  async findAll(query: QueryInspectionDto): Promise<PaginatedResult<unknown>> {
    const { skip, take, page, limit } = getSkipTake(query.page, query.limit);

    const where = {
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

  async update(id: string, dto: UpdateInspectionDto) {
    const current = await this.prisma.inspection.findUnique({ where: { id } });
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

    return this.prisma.inspection.update({
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
