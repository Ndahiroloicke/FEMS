import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  buildPaginationMeta,
  getSkipTake,
  type PaginatedResult,
} from '../common/dto/pagination.dto.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { ExtinguisherStatus, Role } from '../common/prisma-enums.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AssignExtinguisherDto } from './dto/assign-extinguisher.dto.js';
import { CreateExtinguisherDto } from './dto/create-extinguisher.dto.js';
import { QueryExtinguisherDto } from './dto/query-extinguisher.dto.js';
import { UpdateExtinguisherDto } from './dto/update-extinguisher.dto.js';

@Injectable()
export class ExtinguishersService {
  constructor(private readonly prisma: PrismaService) {}

  private assertDateOrder(installation: Date, expiry: Date) {
    if (expiry <= installation) {
      throw new BadRequestException(
        'expiryDate must be after installationDate',
      );
    }
  }

  async create(dto: CreateExtinguisherDto) {
    const existing = await this.prisma.fireExtinguisher.findUnique({
      where: { serialNumber: dto.serialNumber },
    });
    if (existing) {
      throw new ConflictException(
        `Extinguisher ${dto.serialNumber} is already registered`,
      );
    }

    const installationDate = new Date(dto.installationDate);
    const expiryDate = new Date(dto.expiryDate);
    this.assertDateOrder(installationDate, expiryDate);

    return this.prisma.fireExtinguisher.create({
      data: {
        serialNumber: dto.serialNumber,
        location: dto.location,
        type: dto.type,
        size: dto.size,
        installationDate,
        expiryDate,
        status: dto.status ?? undefined,
      },
    });
  }

  async findAll(
    query: QueryExtinguisherDto,
    currentUser: AuthUser,
  ): Promise<PaginatedResult<unknown>> {
    const { skip, take, page, limit } = getSkipTake(query.page, query.limit);

    const ownerFilter =
      currentUser.role === Role.USER ? { ownerId: currentUser.id } : {};

    const where = {
      ...ownerFilter,
      ...(query.status ? { status: query.status } : {}),
      ...(query.type ? { type: query.type } : {}),
      ...(query.search
        ? {
            OR: [
              {
                serialNumber: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
              {
                location: {
                  contains: query.search,
                  mode: 'insensitive' as const,
                },
              },
            ],
          }
        : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.fireExtinguisher.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.fireExtinguisher.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, page, limit) };
  }

  async findOne(id: string, currentUser: AuthUser) {
    const extinguisher = await this.prisma.fireExtinguisher.findUnique({
      where: { id },
      include: {
        inspections: {
          orderBy: { scheduledAt: 'desc' },
          take: 10,
          include: {
            inspector: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
        maintenanceLogs: {
          orderBy: { actionDate: 'desc' },
          take: 10,
          include: {
            inspector: {
              select: { id: true, firstName: true, lastName: true },
            },
          },
        },
      },
    });

    if (!extinguisher) {
      throw new NotFoundException(`Extinguisher ${id} not found`);
    }

    if (
      currentUser.role === Role.USER &&
      extinguisher.ownerId !== currentUser.id
    ) {
      throw new ForbiddenException(
        'You do not have access to this extinguisher',
      );
    }

    return extinguisher;
  }

  async update(id: string, dto: UpdateExtinguisherDto) {
    const current = await this.prisma.fireExtinguisher.findUnique({
      where: { id },
    });
    if (!current) {
      throw new NotFoundException(`Extinguisher ${id} not found`);
    }

    if (dto.serialNumber && dto.serialNumber !== current.serialNumber) {
      const dup = await this.prisma.fireExtinguisher.findUnique({
        where: { serialNumber: dto.serialNumber },
      });
      if (dup) {
        throw new ConflictException(
          `Extinguisher ${dto.serialNumber} is already registered`,
        );
      }
    }

    const installationDate = dto.installationDate
      ? new Date(dto.installationDate)
      : current.installationDate;
    const expiryDate = dto.expiryDate
      ? new Date(dto.expiryDate)
      : current.expiryDate;
    this.assertDateOrder(installationDate, expiryDate);

    return this.prisma.fireExtinguisher.update({
      where: { id },
      data: {
        serialNumber: dto.serialNumber,
        location: dto.location,
        type: dto.type,
        size: dto.size,
        status: dto.status,
        installationDate: dto.installationDate ? installationDate : undefined,
        expiryDate: dto.expiryDate ? expiryDate : undefined,
      },
    });
  }

  async assign(id: string, dto: AssignExtinguisherDto) {
    const current = await this.prisma.fireExtinguisher.findUnique({
      where: { id },
    });
    if (!current) {
      throw new NotFoundException(`Extinguisher ${id} not found`);
    }

    if (dto.ownerId) {
      if (
        current.status === ExtinguisherStatus.OUT_OF_SERVICE ||
        current.status === ExtinguisherStatus.NEEDS_MAINTENANCE
      ) {
        throw new BadRequestException(
          'Cannot assign an extinguisher that is out of service or needs maintenance. Update its status first.',
        );
      }

      const owner = await this.prisma.user.findUnique({
        where: { id: dto.ownerId },
      });
      if (!owner) {
        throw new NotFoundException(`User ${dto.ownerId} not found`);
      }
    }

    return this.prisma.fireExtinguisher.update({
      where: { id },
      data: { ownerId: dto.ownerId ?? null },
      include: {
        owner: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
      },
    });
  }

  async remove(id: string) {
    const current = await this.prisma.fireExtinguisher.findUnique({
      where: { id },
    });
    if (!current) {
      throw new NotFoundException(`Extinguisher ${id} not found`);
    }
    await this.prisma.fireExtinguisher.delete({ where: { id } });
    return { message: 'Extinguisher deleted successfully' };
  }
}
