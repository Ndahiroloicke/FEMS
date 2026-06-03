import { BadRequestException, Injectable } from '@nestjs/common';
import { Parser } from '@json2csv/plainjs';
import PDFDocument from 'pdfkit';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service.js';
import { ExtinguisherStatus } from '../common/prisma-enums.js';

export type ReportName =
  | 'extinguishers'
  | 'inspections'
  | 'maintenance'
  | 'expired';
export type ExportFormat = 'csv' | 'pdf';

interface ReportTable {
  title: string;
  fields: string[];
  rows: Record<string, string>[];
}

@Injectable()
export class ExportService {
  constructor(private readonly prisma: PrismaService) {}

  private async buildTable(report: ReportName): Promise<ReportTable> {
    switch (report) {
      case 'extinguishers': {
        const rows = await this.prisma.fireExtinguisher.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return {
          title: 'Fire Extinguishers',
          fields: [
            'serialNumber',
            'location',
            'type',
            'size',
            'status',
            'installationDate',
            'expiryDate',
          ],
          rows: rows.map((r) => ({
            serialNumber: r.serialNumber,
            location: r.location,
            type: r.type,
            size: r.size,
            status: r.status,
            installationDate: r.installationDate.toISOString().slice(0, 10),
            expiryDate: r.expiryDate.toISOString().slice(0, 10),
          })),
        };
      }
      case 'inspections': {
        const rows = await this.prisma.inspection.findMany({
          orderBy: { scheduledAt: 'desc' },
          include: {
            extinguisher: { select: { serialNumber: true } },
            inspector: { select: { firstName: true, lastName: true } },
          },
        });
        return {
          title: 'Inspections',
          fields: [
            'serialNumber',
            'inspector',
            'status',
            'scheduledAt',
            'completedAt',
            'result',
          ],
          rows: rows.map((r) => ({
            serialNumber: r.extinguisher.serialNumber,
            inspector: r.inspector
              ? `${r.inspector.firstName} ${r.inspector.lastName}`
              : 'Unassigned',
            status: r.status,
            scheduledAt: r.scheduledAt.toISOString(),
            completedAt: r.completedAt ? r.completedAt.toISOString() : '',
            result: r.result ?? '',
          })),
        };
      }
      case 'maintenance': {
        const rows = await this.prisma.maintenanceLog.findMany({
          orderBy: { actionDate: 'desc' },
          include: {
            extinguisher: { select: { serialNumber: true } },
            inspector: { select: { firstName: true, lastName: true } },
          },
        });
        return {
          title: 'Maintenance Logs',
          fields: [
            'serialNumber',
            'inspector',
            'conditionNoted',
            'actionsTaken',
            'actionDate',
          ],
          rows: rows.map((r) => ({
            serialNumber: r.extinguisher.serialNumber,
            inspector: `${r.inspector.firstName} ${r.inspector.lastName}`,
            conditionNoted: r.conditionNoted,
            actionsTaken: r.actionsTaken,
            actionDate: r.actionDate.toISOString().slice(0, 10),
          })),
        };
      }
      case 'expired': {
        const now = new Date();
        const rows = await this.prisma.fireExtinguisher.findMany({
          where: {
            OR: [
              { status: ExtinguisherStatus.EXPIRED },
              { expiryDate: { lt: now } },
            ],
          },
          orderBy: { expiryDate: 'asc' },
        });
        return {
          title: 'Expired Extinguishers',
          fields: ['serialNumber', 'location', 'type', 'status', 'expiryDate'],
          rows: rows.map((r) => ({
            serialNumber: r.serialNumber,
            location: r.location,
            type: r.type,
            status: r.status,
            expiryDate: r.expiryDate.toISOString().slice(0, 10),
          })),
        };
      }
      default:
        throw new BadRequestException(`Unknown report: ${report as string}`);
    }
  }

  async export(report: ReportName, format: ExportFormat, res: Response) {
    if (
      !['extinguishers', 'inspections', 'maintenance', 'expired'].includes(
        report,
      )
    ) {
      throw new BadRequestException(`Unknown report: ${report}`);
    }
    if (format !== 'csv' && format !== 'pdf') {
      throw new BadRequestException(`Unsupported format: ${String(format)}`);
    }

    const table = await this.buildTable(report);
    const filename = `${report}-${new Date().toISOString().slice(0, 10)}.${format}`;

    if (format === 'csv') {
      const parser = new Parser({ fields: table.fields });
      const csv = table.rows.length
        ? parser.parse(table.rows)
        : table.fields.join(',');
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader(
        'Content-Disposition',
        `attachment; filename="${filename}"`,
      );
      res.send(csv);
      return;
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    this.renderPdf(table, res);
  }

  private renderPdf(table: ReportTable, res: Response) {
    const doc = new PDFDocument({
      margin: 36,
      size: 'A4',
      layout: 'landscape',
    });
    doc.pipe(res);

    doc.fontSize(18).text(`FEMS — ${table.title}`, { align: 'left' });
    doc
      .fontSize(9)
      .fillColor('#666')
      .text(`Generated ${new Date().toISOString()}`);
    doc.moveDown(0.5).fillColor('#000');

    doc.fontSize(9).text(table.fields.join('  |  '));
    doc.moveTo(doc.x, doc.y).lineTo(770, doc.y).stroke();
    doc.moveDown(0.3);

    if (table.rows.length === 0) {
      doc.text('No records found.');
    } else {
      for (const row of table.rows) {
        const line = table.fields.map((f) => row[f] ?? '').join('  |  ');
        doc.fontSize(8).text(line);
      }
    }

    doc.end();
  }
}
