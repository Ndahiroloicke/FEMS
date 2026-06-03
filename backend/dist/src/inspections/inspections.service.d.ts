import type { AuthUser } from '../common/decorators/current-user.decorator.js';
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
    private notifyInspectorAssigned;
    create(dto: CreateInspectionDto, currentUser: AuthUser): Promise<{
        extinguisher: {
            id: string;
            serialNumber: string;
            type: import("../common/prisma-enums.js").ExtinguisherType;
            location: string;
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
        status: InspectionStatus;
        extinguisherId: string;
        notes: string | null;
        scheduledById: string;
        inspectorId: string | null;
        scheduledAt: Date;
        result: string | null;
        completedAt: Date | null;
    }>;
    findAll(query: QueryInspectionDto, currentUser: AuthUser): Promise<PaginatedResult<unknown>>;
    findOne(id: string): Promise<{
        maintenanceLogs: {
            id: string;
            createdAt: Date;
            extinguisherId: string;
            inspectorId: string;
            inspectionId: string | null;
            actionsTaken: string;
            conditionNoted: import("../common/prisma-enums.js").MaintenanceCondition;
            actionDate: Date;
        }[];
        extinguisher: {
            id: string;
            serialNumber: string;
            type: import("../common/prisma-enums.js").ExtinguisherType;
            location: string;
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
        status: InspectionStatus;
        extinguisherId: string;
        notes: string | null;
        scheduledById: string;
        inspectorId: string | null;
        scheduledAt: Date;
        result: string | null;
        completedAt: Date | null;
    }>;
    approve(id: string, dto: UpdateInspectionDto): Promise<{
        extinguisher: {
            id: string;
            serialNumber: string;
            type: import("../common/prisma-enums.js").ExtinguisherType;
            location: string;
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
        status: InspectionStatus;
        extinguisherId: string;
        notes: string | null;
        scheduledById: string;
        inspectorId: string | null;
        scheduledAt: Date;
        result: string | null;
        completedAt: Date | null;
    }>;
    update(id: string, dto: UpdateInspectionDto): Promise<{
        extinguisher: {
            id: string;
            serialNumber: string;
            type: import("../common/prisma-enums.js").ExtinguisherType;
            location: string;
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
        status: InspectionStatus;
        extinguisherId: string;
        notes: string | null;
        scheduledById: string;
        inspectorId: string | null;
        scheduledAt: Date;
        result: string | null;
        completedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
