import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  EscalationStatus,
  ExtinguisherStatus,
  NotificationChannel,
  NotificationType,
} from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ComplianceService {
  private readonly logger = new Logger(ComplianceService.name);

  constructor(private readonly prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async handleDailyComplianceChecks() {
    this.logger.log('Running daily compliance checks');
    await this.sendExpiryWarnings();
    await this.escalateNonReturnedExtinguishers();
  }

  async sendExpiryWarnings() {
    const warningDays = Number(process.env.EXPIRY_WARNING_DAYS ?? 30);
    const now = new Date();
    const threshold = new Date(
      now.getTime() + warningDays * 24 * 60 * 60 * 1000,
    );

    const expiring = await this.prisma.fireExtinguisher.findMany({
      where: {
        expiryDate: { lte: threshold, gte: now },
        status: { in: [ExtinguisherStatus.ACTIVE, ExtinguisherStatus.DELIVERED] },
      },
      include: { customer: true },
    });

    for (const extinguisher of expiring) {
      const alreadyNotified = await this.prisma.notification.findFirst({
        where: {
          extinguisherId: extinguisher.id,
          type: NotificationType.EXPIRY_WARNING,
          sentAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
      });

      if (alreadyNotified) {
        continue;
      }

      const daysLeft = Math.ceil(
        (extinguisher.expiryDate.getTime() - now.getTime()) /
          (24 * 60 * 60 * 1000),
      );

      const message = `Reminder: Fire extinguisher ${extinguisher.serialNumber} expires in ${daysLeft} day(s) on ${extinguisher.expiryDate.toISOString().split('T')[0]}. Please return or renew it with our company.`;

      await this.prisma.notification.create({
        data: {
          type: NotificationType.EXPIRY_WARNING,
          channel: NotificationChannel.SYSTEM,
          message,
          customerId: extinguisher.customerId,
          extinguisherId: extinguisher.id,
        },
      });

      this.logger.log(
        `Expiry warning sent to ${extinguisher.customer.fullName} for ${extinguisher.serialNumber}`,
      );
    }

    return { processed: expiring.length };
  }

  async escalateNonReturnedExtinguishers() {
    const now = new Date();

    const overdue = await this.prisma.fireExtinguisher.findMany({
      where: {
        expiryDate: { lt: now },
        status: ExtinguisherStatus.DELIVERED,
      },
      include: { customer: true },
    });

    for (const extinguisher of overdue) {
      await this.prisma.fireExtinguisher.update({
        where: { id: extinguisher.id },
        data: { status: ExtinguisherStatus.EXPIRED },
      });

      const existingEscalation = await this.prisma.escalation.findFirst({
        where: {
          extinguisherId: extinguisher.id,
          status: { in: [EscalationStatus.PENDING, EscalationStatus.REPORTED] },
        },
      });

      if (existingEscalation) {
        continue;
      }

      const reason = `Customer ${extinguisher.customer.fullName} (ID: ${extinguisher.customer.nationalId}) has not returned fire extinguisher ${extinguisher.serialNumber} after expiry on ${extinguisher.expiryDate.toISOString().split('T')[0]}. Police notification required.`;

      await this.prisma.escalation.create({
        data: {
          reason,
          status: EscalationStatus.PENDING,
          customerId: extinguisher.customerId,
          extinguisherId: extinguisher.id,
        },
      });

      await this.prisma.notification.create({
        data: {
          type: NotificationType.POLICE_ESCALATION,
          channel: NotificationChannel.SYSTEM,
          message: reason,
          customerId: extinguisher.customerId,
          extinguisherId: extinguisher.id,
        },
      });

      this.logger.warn(
        `Police escalation created for ${extinguisher.serialNumber}`,
      );
    }

    return { processed: overdue.length };
  }

  async runChecksNow() {
    const warnings = await this.sendExpiryWarnings();
    const escalations = await this.escalateNonReturnedExtinguishers();
    return { warnings, escalations };
  }
}
