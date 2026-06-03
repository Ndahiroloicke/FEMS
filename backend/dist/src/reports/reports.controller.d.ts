import { Response } from 'express';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
import { ExportQueryDto, MaintenanceHistoryQueryDto, StockQueryDto } from './dto/export-query.dto.js';
import { ExportService } from './export.service.js';
import { ReportsService } from './reports.service.js';
export declare class ReportsController {
    private readonly reportsService;
    private readonly exportService;
    constructor(reportsService: ReportsService, exportService: ExportService);
    getSummary(user: AuthUser): Promise<{
        totalExtinguishers: number;
        byStatus: Record<string, number>;
        byType: Record<string, number>;
        registeredToday: number;
        registeredThisMonth: number;
        registeredThisYear: number;
        activeInspections: number;
        expiredCount: number;
    }>;
    getStock(query: StockQueryDto, user: AuthUser): Promise<{
        period: string;
        count: number;
    }[]>;
    getInspectionStatus(user: AuthUser): Promise<{
        byStatus: Record<string, number>;
        total: number;
    }>;
    getExpired(query: MaintenanceHistoryQueryDto, user: AuthUser): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    getMaintenanceHistory(query: MaintenanceHistoryQueryDto, user: AuthUser): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    export(query: ExportQueryDto, res: Response, user: AuthUser): Promise<void>;
}
