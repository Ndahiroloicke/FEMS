import { Injectable } from '@nestjs/common';
import {
  EscalationStatus,
  ExtinguisherStatus,
} from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary() {
    const now = new Date();
    const warningDays = Number(process.env.EXPIRY_WARNING_DAYS ?? 30);
    const threshold = new Date(
      now.getTime() + warningDays * 24 * 60 * 60 * 1000,
    );

    const [
      totalCustomers,
      totalExtinguishers,
      activeExtinguishers,
      deliveredExtinguishers,
      expiringSoon,
      expiredNotReturned,
      pendingEscalations,
      recentNotifications,
    ] = await Promise.all([
      this.prisma.customer.count(),
      this.prisma.fireExtinguisher.count(),
      this.prisma.fireExtinguisher.count({
        where: { status: ExtinguisherStatus.ACTIVE },
      }),
      this.prisma.fireExtinguisher.count({
        where: { status: ExtinguisherStatus.DELIVERED },
      }),
      this.prisma.fireExtinguisher.count({
        where: {
          expiryDate: { lte: threshold, gte: now },
          status: {
            in: [ExtinguisherStatus.ACTIVE, ExtinguisherStatus.DELIVERED],
          },
        },
      }),
      this.prisma.fireExtinguisher.count({
        where: {
          expiryDate: { lt: now },
          status: ExtinguisherStatus.DELIVERED,
        },
      }),
      this.prisma.escalation.count({
        where: { status: EscalationStatus.PENDING },
      }),
      this.prisma.notification.findMany({
        take: 5,
        orderBy: { sentAt: 'desc' },
        include: {
          customer: { select: { fullName: true } },
          extinguisher: { select: { serialNumber: true } },
        },
      }),
    ]);

    return {
      totalCustomers,
      totalExtinguishers,
      activeExtinguishers,
      deliveredExtinguishers,
      expiringSoon,
      expiredNotReturned,
      pendingEscalations,
      recentNotifications,
    };
  }
}
