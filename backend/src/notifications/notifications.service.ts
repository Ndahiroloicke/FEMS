import { Injectable, NotFoundException } from '@nestjs/common';
import {
  NotificationChannel,
  NotificationType,
} from '../common/prisma-enums.js';
import { MailerService } from '../mailer/mailer.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import {
  buildPaginationMeta,
  getSkipTake,
  type PaginatedResult,
} from '../common/dto/pagination.dto.js';

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  message: string;
  extinguisherId?: string | null;
  emailSubject?: string;
  sendEmail?: boolean;
}

@Injectable()
export class NotificationsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailer: MailerService,
  ) {}

  /**
   * Creates an in-app SYSTEM notification, and additionally dispatches an EMAIL
   * notification when requested (SMTP if configured, otherwise logged).
   */
  async createNotification(input: CreateNotificationInput) {
    const notification = await this.prisma.notification.create({
      data: {
        userId: input.userId,
        type: input.type,
        message: input.message,
        extinguisherId: input.extinguisherId ?? null,
        channel: NotificationChannel.SYSTEM,
      },
    });

    if (input.sendEmail) {
      const user = await this.prisma.user.findUnique({
        where: { id: input.userId },
        select: { email: true },
      });

      if (user) {
        await this.prisma.notification.create({
          data: {
            userId: input.userId,
            type: input.type,
            message: input.message,
            extinguisherId: input.extinguisherId ?? null,
            channel: NotificationChannel.EMAIL,
          },
        });

        await this.mailer.sendMail({
          to: user.email,
          subject: input.emailSubject ?? 'Fire Extinguisher Management System',
          text: input.message,
        });
      }
    }

    return notification;
  }

  async notifyAdmins(
    input: Omit<CreateNotificationInput, 'userId'>,
  ): Promise<void> {
    const admins = await this.prisma.user.findMany({
      where: { role: 'ADMIN', isActive: true },
      select: { id: true },
    });

    await Promise.all(
      admins.map((admin) =>
        this.createNotification({ ...input, userId: admin.id }),
      ),
    );
  }

  async findForUser(
    userId: string,
    page = 1,
    limit = 10,
    isRead?: boolean,
  ): Promise<PaginatedResult<unknown>> {
    const { skip, take, page: p, limit: l } = getSkipTake(page, limit);
    const where = {
      userId,
      ...(isRead === undefined ? {} : { isRead }),
    };

    const [data, total] = await Promise.all([
      this.prisma.notification.findMany({
        where,
        orderBy: { sentAt: 'desc' },
        skip,
        take,
        include: {
          extinguisher: { select: { serialNumber: true, location: true } },
        },
      }),
      this.prisma.notification.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, p, l) };
  }

  async markRead(id: string, userId: string) {
    const notification = await this.prisma.notification.findUnique({
      where: { id },
    });
    if (!notification || notification.userId !== userId) {
      throw new NotFoundException(`Notification ${id} not found`);
    }
    return this.prisma.notification.update({
      where: { id },
      data: { isRead: true },
    });
  }

  async markAllRead(userId: string) {
    const result = await this.prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { updated: result.count };
  }
}
