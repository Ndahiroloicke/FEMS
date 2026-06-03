import { type PaginatedResult } from '../common/dto/pagination.dto.js';
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
        actionDate: Date;
        extinguisherId: string;
        inspectorId: string;
        actionsTaken: string;
        conditionNoted: import("../common/prisma-enums.js").MaintenanceCondition;
        inspectionId: string | null;
    }>;
    findAll(query: QueryMaintenanceDto): Promise<PaginatedResult<unknown>>;
    findOne(id: string): Promise<{
        inspection: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            result: string | null;
            status: import("../common/prisma-enums.js").InspectionStatus;
            scheduledAt: Date;
            extinguisherId: string;
            notes: string | null;
            completedAt: Date | null;
            scheduledById: string;
            inspectorId: string | null;
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
        actionDate: Date;
        extinguisherId: string;
        inspectorId: string;
        actionsTaken: string;
        conditionNoted: import("../common/prisma-enums.js").MaintenanceCondition;
        inspectionId: string | null;
    }>;
}
