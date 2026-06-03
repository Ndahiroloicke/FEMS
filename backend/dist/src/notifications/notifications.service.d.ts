import { NotificationChannel, NotificationType } from '../common/prisma-enums.js';
import { MailerService } from '../mailer/mailer.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { type PaginatedResult } from '../common/dto/pagination.dto.js';
export interface CreateNotificationInput {
    userId: string;
    type: NotificationType;
    message: string;
    extinguisherId?: string | null;
    emailSubject?: string;
    sendEmail?: boolean;
}
export declare class NotificationsService {
    private readonly prisma;
    private readonly mailer;
    constructor(prisma: PrismaService, mailer: MailerService);
    createNotification(input: CreateNotificationInput): Promise<{
        id: string;
        type: NotificationType;
        channel: NotificationChannel;
        message: string;
        sentAt: Date;
        extinguisherId: string | null;
        userId: string;
        isRead: boolean;
    }>;
    notifyAdmins(input: Omit<CreateNotificationInput, 'userId'>): Promise<void>;
    findForUser(userId: string, page?: number, limit?: number, isRead?: boolean): Promise<PaginatedResult<unknown>>;
    markRead(id: string, userId: string): Promise<{
        id: string;
        type: NotificationType;
        channel: NotificationChannel;
        message: string;
        sentAt: Date;
        extinguisherId: string | null;
        userId: string;
        isRead: boolean;
    }>;
    markAllRead(userId: string): Promise<{
        updated: number;
    }>;
}
