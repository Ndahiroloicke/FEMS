import { MailerService } from '../mailer/mailer.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class TasksService {
    private readonly prisma;
    private readonly notifications;
    private readonly mailer;
    private readonly logger;
    constructor(prisma: PrismaService, notifications: NotificationsService, mailer: MailerService);
    runDailyMaintenanceJobs(): Promise<void>;
    markExpiredExtinguishers(): Promise<number>;
    warnExpiringSoon(): Promise<number>;
    markOverdueInspections(): Promise<number>;
}
