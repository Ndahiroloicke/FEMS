import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service.js';
export type ReportName = 'extinguishers' | 'inspections' | 'maintenance' | 'expired';
export type ExportFormat = 'csv' | 'pdf';
export declare class ExportService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private buildTable;
    export(report: ReportName, format: ExportFormat, res: Response, userId?: string): Promise<void>;
    private renderPdf;
}
