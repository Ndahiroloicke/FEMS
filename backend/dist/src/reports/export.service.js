"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportService = void 0;
const common_1 = require("@nestjs/common");
const plainjs_1 = require("@json2csv/plainjs");
const pdfkit_1 = __importDefault(require("pdfkit"));
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
let ExportService = class ExportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async buildTable(report, userId) {
        const ownerFilter = userId ? { ownerId: userId } : {};
        switch (report) {
            case 'extinguishers': {
                const rows = await this.prisma.fireExtinguisher.findMany({
                    where: ownerFilter,
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
                    where: userId ? { extinguisher: { ownerId: userId } } : {},
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
                    where: userId ? { extinguisher: { ownerId: userId } } : {},
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
                        ...ownerFilter,
                        OR: [
                            { status: prisma_enums_js_1.ExtinguisherStatus.EXPIRED },
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
                throw new common_1.BadRequestException(`Unknown report: ${report}`);
        }
    }
    async export(report, format, res, userId) {
        if (!['extinguishers', 'inspections', 'maintenance', 'expired'].includes(report)) {
            throw new common_1.BadRequestException(`Unknown report: ${report}`);
        }
        if (format !== 'csv' && format !== 'pdf') {
            throw new common_1.BadRequestException(`Unsupported format: ${String(format)}`);
        }
        const table = await this.buildTable(report, userId);
        const filename = `${report}-${new Date().toISOString().slice(0, 10)}.${format}`;
        if (format === 'csv') {
            const parser = new plainjs_1.Parser({ fields: table.fields });
            const csv = table.rows.length
                ? parser.parse(table.rows)
                : table.fields.join(',');
            res.setHeader('Content-Type', 'text/csv; charset=utf-8');
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
            res.send(csv);
            return;
        }
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        this.renderPdf(table, res);
    }
    renderPdf(table, res) {
        const doc = new pdfkit_1.default({
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
        }
        else {
            for (const row of table.rows) {
                const line = table.fields.map((f) => row[f] ?? '').join('  |  ');
                doc.fontSize(8).text(line);
            }
        }
        doc.end();
    }
};
exports.ExportService = ExportService;
exports.ExportService = ExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ExportService);
//# sourceMappingURL=export.service.js.map