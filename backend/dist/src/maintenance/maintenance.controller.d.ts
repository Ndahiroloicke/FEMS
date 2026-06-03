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
        actionDate: Date;
        extinguisherId: string;
        inspectorId: string;
        actionsTaken: string;
        conditionNoted: import("../common/prisma-enums.js").MaintenanceCondition;
        inspectionId: string | null;
    }>;
    findAll(query: QueryMaintenanceDto): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
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
