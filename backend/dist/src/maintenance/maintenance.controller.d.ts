import { CreateMaintenanceDto } from './dto/create-maintenance.dto.js';
import { QueryMaintenanceDto } from './dto/query-maintenance.dto.js';
import { MaintenanceService } from './maintenance.service.js';
export declare class MaintenanceController {
    private readonly maintenanceService;
    constructor(maintenanceService: MaintenanceService);
    create(dto: CreateMaintenanceDto, userId: string): Promise<{
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
    findAll(query: QueryMaintenanceDto): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    findOne(id: string): Promise<{
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
