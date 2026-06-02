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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let DashboardService = class DashboardService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getSummary() {
        const now = new Date();
        const warningDays = Number(process.env.EXPIRY_WARNING_DAYS ?? 30);
        const threshold = new Date(now.getTime() + warningDays * 24 * 60 * 60 * 1000);
        const [totalCustomers, totalExtinguishers, activeExtinguishers, deliveredExtinguishers, expiringSoon, expiredNotReturned, pendingEscalations, recentNotifications,] = await Promise.all([
            this.prisma.customer.count(),
            this.prisma.fireExtinguisher.count(),
            this.prisma.fireExtinguisher.count({
                where: { status: client_1.ExtinguisherStatus.ACTIVE },
            }),
            this.prisma.fireExtinguisher.count({
                where: { status: client_1.ExtinguisherStatus.DELIVERED },
            }),
            this.prisma.fireExtinguisher.count({
                where: {
                    expiryDate: { lte: threshold, gte: now },
                    status: {
                        in: [client_1.ExtinguisherStatus.ACTIVE, client_1.ExtinguisherStatus.DELIVERED],
                    },
                },
            }),
            this.prisma.fireExtinguisher.count({
                where: {
                    expiryDate: { lt: now },
                    status: client_1.ExtinguisherStatus.DELIVERED,
                },
            }),
            this.prisma.escalation.count({
                where: { status: client_1.EscalationStatus.PENDING },
            }),
            this.prisma.notification.findMany({
                take: 5,
                orderBy: { sentAt: 'desc' },
                include: {
                    customer: { select: { fullName: true } },
                    extinguisher: { select: { serialNumber: true } },
                },
            }),
        ]);
        return {
            totalCustomers,
            totalExtinguishers,
            activeExtinguishers,
            deliveredExtinguishers,
            expiringSoon,
            expiredNotReturned,
            pendingEscalations,
            recentNotifications,
        };
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map