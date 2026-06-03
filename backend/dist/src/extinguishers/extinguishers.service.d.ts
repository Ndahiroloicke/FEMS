import { type PaginatedResult } from '../common/dto/pagination.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateExtinguisherDto } from './dto/create-extinguisher.dto.js';
import { QueryExtinguisherDto } from './dto/query-extinguisher.dto.js';
import { UpdateExtinguisherDto } from './dto/update-extinguisher.dto.js';
export declare class ExtinguishersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private assertDateOrder;
    create(dto: CreateExtinguisherDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        location: string;
        type: import("../common/prisma-enums.js").ExtinguisherType;
        size: string;
        installationDate: Date;
        expiryDate: Date;
        status: import("../common/prisma-enums.js").ExtinguisherStatus;
    }>;
    findAll(query: QueryExtinguisherDto): Promise<PaginatedResult<unknown>>;
    findOne(id: string): Promise<{
        maintenanceLogs: ({
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
            result: string | null;
            status: import("../common/prisma-enums.js").InspectionStatus;
            scheduledAt: Date;
            extinguisherId: string;
            notes: string | null;
            completedAt: Date | null;
            scheduledById: string;
            inspectorId: string | null;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        location: string;
        type: import("../common/prisma-enums.js").ExtinguisherType;
        size: string;
        installationDate: Date;
        expiryDate: Date;
        status: import("../common/prisma-enums.js").ExtinguisherStatus;
    }>;
    update(id: string, dto: UpdateExtinguisherDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        location: string;
        type: import("../common/prisma-enums.js").ExtinguisherType;
        size: string;
        installationDate: Date;
        expiryDate: Date;
        status: import("../common/prisma-enums.js").ExtinguisherStatus;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
