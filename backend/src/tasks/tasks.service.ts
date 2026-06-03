import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import {
  ExtinguisherStatus,
  InspectionStatus,
  NotificationType,
} from '../common/prisma-enums.js';
import { MailerService } from '../mailer/mailer.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';

const EXPIRY_WARNING_DAYS = Number(process.env.EXPIRY_WARNING_DAYS ?? 30);

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly notifications: NotificationsService,
    private readonly mailer: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async runDailyMaintenanceJobs() {
    this.logger.log('Running daily scheduled jobs...');
    await this.markExpiredExtinguishers();
    await this.warnExpiringSoon();
    await this.markOverdueInspections();
  }

  async markExpiredExtinguishers() {
    const now = new Date();
    const result = await this.prisma.fireExtinguisher.updateMany({
      where: {
        expiryDate: { lt: now },
        status: {
          notIn: [
            ExtinguisherStatus.EXPIRED,
            ExtinguisherStatus.OUT_OF_SERVICE,
          ],
        },
      },
      data: { status: ExtinguisherStatus.EXPIRED },
    });
    if (result.count > 0) {
      this.logger.log(`Marked ${result.count} extinguisher(s) as EXPIRED.`);
    }
    return result.count;
  }

  async warnExpiringSoon() {
    const now = new Date();
    const threshold = new Date(
      now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000,
    );

    const expiringSoon = await this.prisma.fireExtinguisher.findMany({
      where: {
        expiryDate: { gte: now, lte: threshold },
        status: ExtinguisherStatus.ACTIVE,
      },
    });

    for (const ext of expiringSoon) {
      const message = `Extinguisher ${ext.serialNumber} (${ext.location}) expires on ${ext.expiryDate
        .toISOString()
        .slice(0, 10)}.`;
      await this.notifications.notifyAdmins({
        type: NotificationType.EXPIRY_WARNING,
        message,
        extinguisherId: ext.id,
        emailSubject: 'FEMS — Extinguisher expiring soon',
        sendEmail: this.mailer.isConfigured,
      });
    }

    if (expiringSoon.length > 0) {
      this.logger.log(
        `Issued ${expiringSoon.length} expiry warning(s) (within ${EXPIRY_WARNING_DAYS} days).`,
      );
    }
    return expiringSoon.length;
  }

  async markOverdueInspections() {
    const now = new Date();
    const result = await this.prisma.inspection.updateMany({
      where: {
        scheduledAt: { lt: now },
        status: InspectionStatus.SCHEDULED,
      },
      data: { status: InspectionStatus.OVERDUE },
    });
    if (result.count > 0) {
      this.logger.log(`Marked ${result.count} inspection(s) as OVERDUE.`);
    }
    return result.count;
  }
}
