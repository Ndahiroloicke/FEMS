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
var TasksService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TasksService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const mailer_service_js_1 = require("../mailer/mailer.service.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const EXPIRY_WARNING_DAYS = Number(process.env.EXPIRY_WARNING_DAYS ?? 30);
let TasksService = TasksService_1 = class TasksService {
    constructor(prisma, notifications, mailer) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.mailer = mailer;
        this.logger = new common_1.Logger(TasksService_1.name);
    }
    async runDailyMaintenanceJobs() {
        this.logger.log('Running daily scheduled jobs...');
        await this.markExpiredExtinguishers();
        await this.warnExpiringSoon();
        await this.markOverdueInspections();
    }
    async markExpiredExtinguishers() {
        const now = new Date();
        const result = await this.prisma.fireExtinguisher.updateMany({
            where: {
                expiryDate: { lt: now },
                status: {
                    notIn: [
                        prisma_enums_js_1.ExtinguisherStatus.EXPIRED,
                        prisma_enums_js_1.ExtinguisherStatus.OUT_OF_SERVICE,
                    ],
                },
            },
            data: { status: prisma_enums_js_1.ExtinguisherStatus.EXPIRED },
        });
        if (result.count > 0) {
            this.logger.log(`Marked ${result.count} extinguisher(s) as EXPIRED.`);
        }
        return result.count;
    }
    async warnExpiringSoon() {
        const now = new Date();
        const threshold = new Date(now.getTime() + EXPIRY_WARNING_DAYS * 24 * 60 * 60 * 1000);
        const expiringSoon = await this.prisma.fireExtinguisher.findMany({
            where: {
                expiryDate: { gte: now, lte: threshold },
                status: prisma_enums_js_1.ExtinguisherStatus.ACTIVE,
            },
        });
        for (const ext of expiringSoon) {
            const message = `Extinguisher ${ext.serialNumber} (${ext.location}) expires on ${ext.expiryDate
                .toISOString()
                .slice(0, 10)}.`;
            await this.notifications.notifyAdmins({
                type: prisma_enums_js_1.NotificationType.EXPIRY_WARNING,
                message,
                extinguisherId: ext.id,
                emailSubject: 'FEMS — Extinguisher expiring soon',
                sendEmail: this.mailer.isConfigured,
            });
        }
        if (expiringSoon.length > 0) {
            this.logger.log(`Issued ${expiringSoon.length} expiry warning(s) (within ${EXPIRY_WARNING_DAYS} days).`);
        }
        return expiringSoon.length;
    }
    async markOverdueInspections() {
        const now = new Date();
        const result = await this.prisma.inspection.updateMany({
            where: {
                scheduledAt: { lt: now },
                status: prisma_enums_js_1.InspectionStatus.SCHEDULED,
            },
            data: { status: prisma_enums_js_1.InspectionStatus.OVERDUE },
        });
        if (result.count > 0) {
            this.logger.log(`Marked ${result.count} inspection(s) as OVERDUE.`);
        }
        return result.count;
    }
};
exports.TasksService = TasksService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_2AM),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TasksService.prototype, "runDailyMaintenanceJobs", null);
exports.TasksService = TasksService = TasksService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        notifications_service_js_1.NotificationsService,
        mailer_service_js_1.MailerService])
], TasksService);
//# sourceMappingURL=tasks.service.js.map