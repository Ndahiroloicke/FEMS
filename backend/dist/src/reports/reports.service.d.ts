import { type PaginatedResult } from '../common/dto/pagination.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
export type StockPeriod = 'daily' | 'monthly' | 'yearly';
export declare class ReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private startOfToday;
    private startOfMonth;
    private startOfYear;
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
    getStock(period: StockPeriod): Promise<{
        period: string;
        count: number;
    }[]>;
    private bucketKey;
    getInspectionStatusCounts(): Promise<{
        byStatus: Record<string, number>;
        total: number;
    }>;
    getExpired(page?: number, limit?: number): Promise<PaginatedResult<unknown>>;
    getMaintenanceHistory(extinguisherId?: string, page?: number, limit?: number): Promise<PaginatedResult<unknown>>;
}
