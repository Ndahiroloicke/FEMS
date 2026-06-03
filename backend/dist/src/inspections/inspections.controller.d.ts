import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { CreateInspectionDto } from './dto/create-inspection.dto.js';
import { QueryInspectionDto } from './dto/query-inspection.dto.js';
import { UpdateInspectionDto } from './dto/update-inspection.dto.js';
import { InspectionsService } from './inspections.service.js';
export declare class InspectionsController {
    private readonly inspectionsService;
    constructor(inspectionsService: InspectionsService);
    create(dto: CreateInspectionDto, user: AuthUser): Promise<{
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
        status: import("../common/prisma-enums.js").InspectionStatus;
        extinguisherId: string;
        notes: string | null;
        scheduledById: string;
        inspectorId: string | null;
        scheduledAt: Date;
        result: string | null;
        completedAt: Date | null;
    }>;
    findAll(query: QueryInspectionDto, user: AuthUser): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
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
        status: import("../common/prisma-enums.js").InspectionStatus;
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
        status: import("../common/prisma-enums.js").InspectionStatus;
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
        status: import("../common/prisma-enums.js").InspectionStatus;
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
