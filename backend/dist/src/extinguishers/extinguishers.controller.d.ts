import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { AssignExtinguisherDto } from './dto/assign-extinguisher.dto.js';
import { CreateExtinguisherDto } from './dto/create-extinguisher.dto.js';
import { QueryExtinguisherDto } from './dto/query-extinguisher.dto.js';
import { UpdateExtinguisherDto } from './dto/update-extinguisher.dto.js';
import { ExtinguishersService } from './extinguishers.service.js';
export declare class ExtinguishersController {
    private readonly extinguishersService;
    constructor(extinguishersService: ExtinguishersService);
    create(dto: CreateExtinguisherDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: import("../common/prisma-enums.js").ExtinguisherType;
        expiryDate: Date;
        status: import("../common/prisma-enums.js").ExtinguisherStatus;
        location: string;
        size: string;
        installationDate: Date;
        ownerId: string | null;
    }>;
    findAll(query: QueryExtinguisherDto, user: AuthUser): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    findOne(id: string, user: AuthUser): Promise<{
        maintenanceLogs: ({
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
        })[];
        inspections: ({
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
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: import("../common/prisma-enums.js").ExtinguisherType;
        expiryDate: Date;
        status: import("../common/prisma-enums.js").ExtinguisherStatus;
        location: string;
        size: string;
        installationDate: Date;
        ownerId: string | null;
    }>;
    assign(id: string, dto: AssignExtinguisherDto): Promise<{
        owner: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
        } | null;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: import("../common/prisma-enums.js").ExtinguisherType;
        expiryDate: Date;
        status: import("../common/prisma-enums.js").ExtinguisherStatus;
        location: string;
        size: string;
        installationDate: Date;
        ownerId: string | null;
    }>;
    update(id: string, dto: UpdateExtinguisherDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: import("../common/prisma-enums.js").ExtinguisherType;
        expiryDate: Date;
        status: import("../common/prisma-enums.js").ExtinguisherStatus;
        location: string;
        size: string;
        installationDate: Date;
        ownerId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
