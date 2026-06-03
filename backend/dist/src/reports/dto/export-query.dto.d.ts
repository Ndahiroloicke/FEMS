import { PaginationDto } from '../../common/dto/pagination.dto.js';
export declare class StockQueryDto {
    period?: 'daily' | 'monthly' | 'yearly';
}
export declare class MaintenanceHistoryQueryDto extends PaginationDto {
    extinguisherId?: string;
}
export declare class ExportQueryDto {
    report: 'extinguishers' | 'inspections' | 'maintenance' | 'expired';
    format: 'csv' | 'pdf';
}
