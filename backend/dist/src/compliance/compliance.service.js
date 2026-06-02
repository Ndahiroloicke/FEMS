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
var ComplianceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplianceService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("../generated/prisma/client");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let ComplianceService = ComplianceService_1 = class ComplianceService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(ComplianceService_1.name);
    }
    async handleDailyComplianceChecks() {
        this.logger.log('Running daily compliance checks');
        await this.sendExpiryWarnings();
        await this.escalateNonReturnedExtinguishers();
    }
    async sendExpiryWarnings() {
        const warningDays = Number(process.env.EXPIRY_WARNING_DAYS ?? 30);
        const now = new Date();
        const threshold = new Date(now.getTime() + warningDays * 24 * 60 * 60 * 1000);
        const expiring = await this.prisma.fireExtinguisher.findMany({
            where: {
                expiryDate: { lte: threshold, gte: now },
                status: { in: [client_1.ExtinguisherStatus.ACTIVE, client_1.ExtinguisherStatus.DELIVERED] },
            },
            include: { customer: true },
        });
        for (const extinguisher of expiring) {
            const alreadyNotified = await this.prisma.notification.findFirst({
                where: {
                    extinguisherId: extinguisher.id,
                    type: client_1.NotificationType.EXPIRY_WARNING,
                    sentAt: { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) },
                },
            });
            if (alreadyNotified) {
                continue;
            }
            const daysLeft = Math.ceil((extinguisher.expiryDate.getTime() - now.getTime()) /
                (24 * 60 * 60 * 1000));
            const message = `Reminder: Fire extinguisher ${extinguisher.serialNumber} expires in ${daysLeft} day(s) on ${extinguisher.expiryDate.toISOString().split('T')[0]}. Please return or renew it with our company.`;
            await this.prisma.notification.create({
                data: {
                    type: client_1.NotificationType.EXPIRY_WARNING,
                    channel: client_1.NotificationChannel.SYSTEM,
                    message,
                    customerId: extinguisher.customerId,
                    extinguisherId: extinguisher.id,
                },
            });
            this.logger.log(`Expiry warning sent to ${extinguisher.customer.fullName} for ${extinguisher.serialNumber}`);
        }
        return { processed: expiring.length };
    }
    async escalateNonReturnedExtinguishers() {
        const now = new Date();
        const overdue = await this.prisma.fireExtinguisher.findMany({
            where: {
                expiryDate: { lt: now },
                status: client_1.ExtinguisherStatus.DELIVERED,
            },
            include: { customer: true },
        });
        for (const extinguisher of overdue) {
            await this.prisma.fireExtinguisher.update({
                where: { id: extinguisher.id },
                data: { status: client_1.ExtinguisherStatus.EXPIRED },
            });
            const existingEscalation = await this.prisma.escalation.findFirst({
                where: {
                    extinguisherId: extinguisher.id,
                    status: { in: [client_1.EscalationStatus.PENDING, client_1.EscalationStatus.REPORTED] },
                },
            });
            if (existingEscalation) {
                continue;
            }
            const reason = `Customer ${extinguisher.customer.fullName} (ID: ${extinguisher.customer.nationalId}) has not returned fire extinguisher ${extinguisher.serialNumber} after expiry on ${extinguisher.expiryDate.toISOString().split('T')[0]}. Police notification required.`;
            await this.prisma.escalation.create({
                data: {
                    reason,
                    status: client_1.EscalationStatus.PENDING,
                    customerId: extinguisher.customerId,
                    extinguisherId: extinguisher.id,
                },
            });
            await this.prisma.notification.create({
                data: {
                    type: client_1.NotificationType.POLICE_ESCALATION,
                    channel: client_1.NotificationChannel.SYSTEM,
                    message: reason,
                    customerId: extinguisher.customerId,
                    extinguisherId: extinguisher.id,
                },
            });
            this.logger.warn(`Police escalation created for ${extinguisher.serialNumber}`);
        }
        return { processed: overdue.length };
    }
    async runChecksNow() {
        const warnings = await this.sendExpiryWarnings();
        const escalations = await this.escalateNonReturnedExtinguishers();
        return { warnings, escalations };
    }
};
exports.ComplianceService = ComplianceService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_8AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ComplianceService.prototype, "handleDailyComplianceChecks", null);
exports.ComplianceService = ComplianceService = ComplianceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ComplianceService);
//# sourceMappingURL=compliance.service.js.map