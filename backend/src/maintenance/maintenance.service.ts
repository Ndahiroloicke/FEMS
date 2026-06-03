import { Injectable, NotFoundException } from '@nestjs/common';
import {
  buildPaginationMeta,
  getSkipTake,
  type PaginatedResult,
} from '../common/dto/pagination.dto.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { NotificationType, Role } from '../common/prisma-enums.js';
import { MailerService } from '../mailer/mailer.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto.js';
import { QueryMaintenanceDto } from './dto/query-maintenance.dto.js';

const maintenanceInclude = {
  extinguisher: {
    select: { id: true, serialNumber: true, location: true },
  },
  inspector: { select: { id: true, firstName: true, lastName: true } },
} as const;

@Injectable()
export class MaintenanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly mailer: MailerService,
  ) {}

  async create(dto: CreateMaintenanceDto, currentUserId: string) {
    const extinguisher = await this.prisma.fireExtinguisher.findUnique({
      where: { id: dto.extinguisherId },
    });
    if (!extinguisher) {
      throw new NotFoundException(
        `Extinguisher ${dto.extinguisherId} not found`,
      );
    }

    if (dto.inspectionId) {
      const inspection = await this.prisma.inspection.findUnique({
        where: { id: dto.inspectionId },
      });
      if (!inspection) {
        throw new NotFoundException(`Inspection ${dto.inspectionId} not found`);
      }
    }

    const log = await this.prisma.maintenanceLog.create({
      data: {
        extinguisherId: dto.extinguisherId,
        inspectorId: currentUserId,
        inspectionId: dto.inspectionId ?? null,
        actionsTaken: dto.actionsTaken,
        conditionNoted: dto.conditionNoted,
        actionDate: new Date(dto.actionDate),
      },
      include: maintenanceInclude,
    });

    const message = `Maintenance logged for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}): ${dto.actionsTaken} — condition ${dto.conditionNoted}.`;

    await this.notifications.notifyAdmins({
      type: NotificationType.MAINTENANCE_LOGGED,
      message,
      extinguisherId: extinguisher.id,
      emailSubject: 'FEMS — Maintenance logged',
      sendEmail: this.mailer.isConfigured,
    });

    return log;
  }

  async findAll(
    query: QueryMaintenanceDto,
    currentUser?: AuthUser,
  ): Promise<PaginatedResult<unknown>> {
    const { skip, take, page, limit } = getSkipTake(query.page, query.limit);

    const ownerFilter =
      currentUser?.role === Role.USER
        ? { extinguisher: { ownerId: currentUser.id } }
        : {};

    const where = {
      ...ownerFilter,
      ...(query.extinguisherId ? { extinguisherId: query.extinguisherId } : {}),
      ...(query.inspectorId ? { inspectorId: query.inspectorId } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.maintenanceLog.findMany({
        where,
        include: maintenanceInclude,
        orderBy: { actionDate: 'desc' },
        skip,
        take,
      }),
      this.prisma.maintenanceLog.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, page, limit) };
  }

  async findOne(id: string) {
    const log = await this.prisma.maintenanceLog.findUnique({
      where: { id },
      include: { ...maintenanceInclude, inspection: true },
    });
    if (!log) {
      throw new NotFoundException(`Maintenance log ${id} not found`);
    }
    return log;
  }
}
