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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportsService = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_js_1 = require("../common/dto/pagination.dto.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let ReportsService = class ReportsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    startOfToday() {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }
    startOfMonth() {
        const d = new Date();
        return new Date(d.getFullYear(), d.getMonth(), 1);
    }
    startOfYear() {
        const d = new Date();
        return new Date(d.getFullYear(), 0, 1);
    }
    async getSummary() {
        const now = new Date();
        const [totalExtinguishers, statusGroups, typeGroups, registeredToday, registeredThisMonth, registeredThisYear, activeInspections, expiredCount,] = await Promise.all([
            this.prisma.fireExtinguisher.count(),
            this.prisma.fireExtinguisher.groupBy({
                by: ['status'],
                _count: { _all: true },
            }),
            this.prisma.fireExtinguisher.groupBy({
                by: ['type'],
                _count: { _all: true },
            }),
            this.prisma.fireExtinguisher.count({
                where: { createdAt: { gte: this.startOfToday() } },
            }),
            this.prisma.fireExtinguisher.count({
                where: { createdAt: { gte: this.startOfMonth() } },
            }),
            this.prisma.fireExtinguisher.count({
                where: { createdAt: { gte: this.startOfYear() } },
            }),
            this.prisma.inspection.count({
                where: {
                    status: {
                        in: [
                            prisma_enums_js_1.InspectionStatus.SCHEDULED,
                            prisma_enums_js_1.InspectionStatus.IN_PROGRESS,
                            prisma_enums_js_1.InspectionStatus.OVERDUE,
                        ],
                    },
                },
            }),
            this.prisma.fireExtinguisher.count({
                where: {
                    OR: [
                        { status: prisma_enums_js_1.ExtinguisherStatus.EXPIRED },
                        { expiryDate: { lt: now } },
                    ],
                },
            }),
        ]);
        const countsByStatus = {};
        for (const status of Object.values(prisma_enums_js_1.ExtinguisherStatus)) {
            countsByStatus[status] = 0;
        }
        for (const g of statusGroups) {
            countsByStatus[g.status] = g._count._all;
        }
        const countsByType = {};
        for (const type of Object.values(prisma_enums_js_1.ExtinguisherType)) {
            countsByType[type] = 0;
        }
        for (const g of typeGroups) {
            countsByType[g.type] = g._count._all;
        }
        return {
            totalExtinguishers,
            byStatus: countsByStatus,
            byType: countsByType,
            registeredToday,
            registeredThisMonth,
            registeredThisYear,
            activeInspections,
            expiredCount,
        };
    }
    async getStock(period) {
        const extinguishers = await this.prisma.fireExtinguisher.findMany({
            select: { createdAt: true },
            orderBy: { createdAt: 'asc' },
        });
        const buckets = new Map();
        for (const { createdAt } of extinguishers) {
            const key = this.bucketKey(createdAt, period);
            buckets.set(key, (buckets.get(key) ?? 0) + 1);
        }
        return Array.from(buckets.entries()).map(([label, count]) => ({
            period: label,
            count,
        }));
    }
    bucketKey(date, period) {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        if (period === 'yearly')
            return `${y}`;
        if (period === 'monthly')
            return `${y}-${m}`;
        return `${y}-${m}-${d}`;
    }
    async getInspectionStatusCounts() {
        const groups = await this.prisma.inspection.groupBy({
            by: ['status'],
            _count: { _all: true },
        });
        const counts = {};
        for (const status of Object.values(prisma_enums_js_1.InspectionStatus)) {
            counts[status] = 0;
        }
        let total = 0;
        for (const g of groups) {
            counts[g.status] = g._count._all;
            total += g._count._all;
        }
        return { byStatus: counts, total };
    }
    async getExpired(page = 1, limit = 10) {
        const { skip, take, page: p, limit: l } = (0, pagination_dto_js_1.getSkipTake)(page, limit);
        const now = new Date();
        const where = {
            OR: [{ status: prisma_enums_js_1.ExtinguisherStatus.EXPIRED }, { expiryDate: { lt: now } }],
        };
        const [data, total] = await Promise.all([
            this.prisma.fireExtinguisher.findMany({
                where,
                orderBy: { expiryDate: 'asc' },
                skip,
                take,
            }),
            this.prisma.fireExtinguisher.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_js_1.buildPaginationMeta)(total, p, l) };
    }
    async getMaintenanceHistory(extinguisherId, page = 1, limit = 10) {
        const { skip, take, page: p, limit: l } = (0, pagination_dto_js_1.getSkipTake)(page, limit);
        const where = extinguisherId ? { extinguisherId } : {};
        const [data, total] = await Promise.all([
            this.prisma.maintenanceLog.findMany({
                where,
                orderBy: { actionDate: 'desc' },
                skip,
                take,
                include: {
                    extinguisher: { select: { serialNumber: true, location: true } },
                    inspector: { select: { firstName: true, lastName: true } },
                },
            }),
            this.prisma.maintenanceLog.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_js_1.buildPaginationMeta)(total, p, l) };
    }
};
exports.ReportsService = ReportsService;
exports.ReportsService = ReportsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ReportsService);
//# sourceMappingURL=reports.service.js.map