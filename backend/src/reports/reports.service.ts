import { Injectable } from '@nestjs/common';
import {
  buildPaginationMeta,
  getSkipTake,
  type PaginatedResult,
} from '../common/dto/pagination.dto.js';
import {
  ExtinguisherStatus,
  ExtinguisherType,
  InspectionStatus,
} from '../common/prisma-enums.js';
import { PrismaService } from '../prisma/prisma.service.js';

export type StockPeriod = 'daily' | 'monthly' | 'yearly';

@Injectable()
export class ReportsService {
  constructor(private readonly prisma: PrismaService) {}

  private startOfToday(): Date {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  private startOfMonth(): Date {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  private startOfYear(): Date {
    const d = new Date();
    return new Date(d.getFullYear(), 0, 1);
  }

  async getSummary(userId?: string) {
    const now = new Date();
    const ownerFilter = userId ? { ownerId: userId } : {};

    const [
      totalExtinguishers,
      statusGroups,
      typeGroups,
      registeredToday,
      registeredThisMonth,
      registeredThisYear,
      activeInspections,
      expiredCount,
    ] = await Promise.all([
      this.prisma.fireExtinguisher.count({ where: ownerFilter }),
      this.prisma.fireExtinguisher.groupBy({
        by: ['status'],
        _count: { _all: true },
        where: ownerFilter,
      }),
      this.prisma.fireExtinguisher.groupBy({
        by: ['type'],
        _count: { _all: true },
        where: ownerFilter,
      }),
      this.prisma.fireExtinguisher.count({
        where: { ...ownerFilter, createdAt: { gte: this.startOfToday() } },
      }),
      this.prisma.fireExtinguisher.count({
        where: { ...ownerFilter, createdAt: { gte: this.startOfMonth() } },
      }),
      this.prisma.fireExtinguisher.count({
        where: { ...ownerFilter, createdAt: { gte: this.startOfYear() } },
      }),
      this.prisma.inspection.count({
        where: {
          ...(userId
            ? { extinguisher: { ownerId: userId } }
            : {}),
          status: {
            in: [
              InspectionStatus.SCHEDULED,
              InspectionStatus.IN_PROGRESS,
              InspectionStatus.OVERDUE,
            ],
          },
        },
      }),
      this.prisma.fireExtinguisher.count({
        where: {
          ...ownerFilter,
          OR: [
            { status: ExtinguisherStatus.EXPIRED },
            { expiryDate: { lt: now } },
          ],
        },
      }),
    ]);

    const countsByStatus: Record<string, number> = {};
    for (const status of Object.values(ExtinguisherStatus)) {
      countsByStatus[status] = 0;
    }
    for (const g of statusGroups) {
      countsByStatus[g.status] = g._count._all;
    }

    const countsByType: Record<string, number> = {};
    for (const type of Object.values(ExtinguisherType)) {
      countsByType[type] = 0;
    }
    for (const g of typeGroups) {
      countsByType[g.type] = g._count._all;
    }

    return {
      totalExtinguishers,
      byStatus: countsByStatus,
      byType: countsByType,
      registeredToday,
      registeredThisMonth,
      registeredThisYear,
      activeInspections,
      expiredCount,
    };
  }

  async getStock(period: StockPeriod, userId?: string) {
    const ownerFilter = userId ? { ownerId: userId } : {};
    const extinguishers = await this.prisma.fireExtinguisher.findMany({
      select: { createdAt: true },
      where: ownerFilter,
      orderBy: { createdAt: 'asc' },
    });

    const buckets = new Map<string, number>();
    for (const { createdAt } of extinguishers) {
      const key = this.bucketKey(createdAt, period);
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }

    return Array.from(buckets.entries()).map(([label, count]) => ({
      period: label,
      count,
    }));
  }

  private bucketKey(date: Date, period: StockPeriod): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    if (period === 'yearly') return `${y}`;
    if (period === 'monthly') return `${y}-${m}`;
    return `${y}-${m}-${d}`;
  }

  async getInspectionStatusCounts(userId?: string) {
    const groups = await this.prisma.inspection.groupBy({
      by: ['status'],
      _count: { _all: true },
      where: userId ? { extinguisher: { ownerId: userId } } : {},
    });

    const counts: Record<string, number> = {};
    for (const status of Object.values(InspectionStatus)) {
      counts[status] = 0;
    }
    let total = 0;
    for (const g of groups) {
      counts[g.status] = g._count._all;
      total += g._count._all;
    }
    return { byStatus: counts, total };
  }

  async getExpired(
    page = 1,
    limit = 10,
    userId?: string,
  ): Promise<PaginatedResult<unknown>> {
    const { skip, take, page: p, limit: l } = getSkipTake(page, limit);
    const now = new Date();
    const ownerFilter = userId ? { ownerId: userId } : {};
    const where = {
      ...ownerFilter,
      OR: [{ status: ExtinguisherStatus.EXPIRED }, { expiryDate: { lt: now } }],
    };

    const [data, total] = await Promise.all([
      this.prisma.fireExtinguisher.findMany({
        where,
        orderBy: { expiryDate: 'asc' },
        skip,
        take,
      }),
      this.prisma.fireExtinguisher.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, p, l) };
  }

  async getMaintenanceHistory(
    extinguisherId?: string,
    page = 1,
    limit = 10,
    userId?: string,
  ): Promise<PaginatedResult<unknown>> {
    const { skip, take, page: p, limit: l } = getSkipTake(page, limit);
    const where = {
      ...(extinguisherId ? { extinguisherId } : {}),
      ...(userId ? { extinguisher: { ownerId: userId } } : {}),
    };

    const [data, total] = await Promise.all([
      this.prisma.maintenanceLog.findMany({
        where,
        orderBy: { actionDate: 'desc' },
        skip,
        take,
        include: {
          extinguisher: { select: { serialNumber: true, location: true } },
          inspector: { select: { firstName: true, lastName: true } },
        },
      }),
      this.prisma.maintenanceLog.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, p, l) };
  }
}
