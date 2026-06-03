import { type PaginatedResult } from '../common/dto/pagination.dto.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { MailerService } from '../mailer/mailer.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto.js';
import { QueryMaintenanceDto } from './dto/query-maintenance.dto.js';
export declare class MaintenanceService {
    private readonly prisma;
    private readonly notifications;
    private readonly mailer;
    constructor(prisma: PrismaService, notifications: NotificationsService, mailer: MailerService);
    create(dto: CreateMaintenanceDto, currentUserId: string): Promise<{
        extinguisher: {
            id: string;
            serialNumber: string;
            location: string;
        };
        inspector: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        extinguisherId: string;
        inspectorId: string;
        inspectionId: string | null;
        actionsTaken: string;
        conditionNoted: import("../common/prisma-enums.js").MaintenanceCondition;
        actionDate: Date;
    }>;
    findAll(query: QueryMaintenanceDto, currentUser?: AuthUser): Promise<PaginatedResult<unknown>>;
    findOne(id: string): Promise<{
        inspection: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../common/prisma-enums.js").InspectionStatus;
            extinguisherId: string;
            notes: string | null;
            scheduledById: string;
            inspectorId: string | null;
            scheduledAt: Date;
            result: string | null;
            completedAt: Date | null;
        } | null;
        extinguisher: {
            id: string;
            serialNumber: string;
            location: string;
        };
        inspector: {
            id: string;
            firstName: string;
            lastName: string;
        };
    } & {
        id: string;
        createdAt: Date;
        extinguisherId: string;
        inspectorId: string;
        inspectionId: string | null;
        actionsTaken: string;
        conditionNoted: import("../common/prisma-enums.js").MaintenanceCondition;
        actionDate: Date;
    }>;
}
