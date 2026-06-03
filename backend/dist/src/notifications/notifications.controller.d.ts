import { PaginationDto } from '../common/dto/pagination.dto.js';
import { NotificationsService } from './notifications.service.js';
declare class ListNotificationsDto extends PaginationDto {
    isRead?: string;
}
export declare class NotificationsController {
    private readonly notificationsService;
    constructor(notificationsService: NotificationsService);
    findAll(userId: string, query: ListNotificationsDto): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    markAllRead(userId: string): Promise<{
        updated: number;
    }>;
    markRead(id: string, userId: string): Promise<{
        id: string;
        type: import("../common/prisma-enums.js").NotificationType;
        channel: import("../common/prisma-enums.js").NotificationChannel;
        message: string;
        sentAt: Date;
        extinguisherId: string | null;
        userId: string;
        isRead: boolean;
    }>;
}
export {};
