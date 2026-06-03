import { Response } from 'express';
import { ExportQueryDto, MaintenanceHistoryQueryDto, StockQueryDto } from './dto/export-query.dto.js';
import { ExportService } from './export.service.js';
import { ReportsService } from './reports.service.js';
export declare class ReportsController {
    private readonly reportsService;
    private readonly exportService;
    constructor(reportsService: ReportsService, exportService: ExportService);
    getSummary(): Promise<{
        totalExtinguishers: number;
        byStatus: Record<string, number>;
        byType: Record<string, number>;
        registeredToday: number;
        registeredThisMonth: number;
        registeredThisYear: number;
        activeInspections: number;
        expiredCount: number;
    }>;
    getStock(query: StockQueryDto): Promise<{
        period: string;
        count: number;
    }[]>;
    getInspectionStatus(): Promise<{
        byStatus: Record<string, number>;
        total: number;
    }>;
    getExpired(query: MaintenanceHistoryQueryDto): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    getMaintenanceHistory(query: MaintenanceHistoryQueryDto): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    export(query: ExportQueryDto, res: Response): Promise<void>;
}
