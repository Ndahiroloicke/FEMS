import { type PaginatedResult } from '../common/dto/pagination.dto.js';
import { InspectionStatus } from '../common/prisma-enums.js';
import { MailerService } from '../mailer/mailer.service.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateInspectionDto } from './dto/create-inspection.dto.js';
import { QueryInspectionDto } from './dto/query-inspection.dto.js';
import { UpdateInspectionDto } from './dto/update-inspection.dto.js';
export declare class InspectionsService {
    private readonly prisma;
    private readonly notifications;
    private readonly mailer;
    constructor(prisma: PrismaService, notifications: NotificationsService, mailer: MailerService);
    create(dto: CreateInspectionDto, currentUserId: string): Promise<{
        extinguisher: {
            id: string;
            serialNumber: string;
            location: string;
            type: import("../common/prisma-enums.js").ExtinguisherType;
        };
        scheduledBy: {
            id: string;
            firstName: string;
            lastName: string;
        };
        inspector: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        status: InspectionStatus;
        scheduledAt: Date;
        extinguisherId: string;
        notes: string | null;
        completedAt: Date | null;
        scheduledById: string;
        inspectorId: string | null;
    }>;
    findAll(query: QueryInspectionDto): Promise<PaginatedResult<unknown>>;
    findOne(id: string): Promise<{
        maintenanceLogs: {
            id: string;
            createdAt: Date;
            actionDate: Date;
            extinguisherId: string;
            inspectorId: string;
            actionsTaken: string;
            conditionNoted: import("../common/prisma-enums.js").MaintenanceCondition;
            inspectionId: string | null;
        }[];
        extinguisher: {
            id: string;
            serialNumber: string;
            location: string;
            type: import("../common/prisma-enums.js").ExtinguisherType;
        };
        scheduledBy: {
            id: string;
            firstName: string;
            lastName: string;
        };
        inspector: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        status: InspectionStatus;
        scheduledAt: Date;
        extinguisherId: string;
        notes: string | null;
        completedAt: Date | null;
        scheduledById: string;
        inspectorId: string | null;
    }>;
    update(id: string, dto: UpdateInspectionDto): Promise<{
        extinguisher: {
            id: string;
            serialNumber: string;
            location: string;
            type: import("../common/prisma-enums.js").ExtinguisherType;
        };
        scheduledBy: {
            id: string;
            firstName: string;
            lastName: string;
        };
        inspector: {
            id: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        result: string | null;
        status: InspectionStatus;
        scheduledAt: Date;
        extinguisherId: string;
        notes: string | null;
        completedAt: Date | null;
        scheduledById: string;
        inspectorId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
