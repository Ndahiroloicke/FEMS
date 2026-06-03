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
exports.NotificationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const mailer_service_js_1 = require("../mailer/mailer.service.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const pagination_dto_js_1 = require("../common/dto/pagination.dto.js");
let NotificationsService = class NotificationsService {
    constructor(prisma, mailer) {
        this.prisma = prisma;
        this.mailer = mailer;
    }
    async createNotification(input) {
        const notification = await this.prisma.notification.create({
            data: {
                userId: input.userId,
                type: input.type,
                message: input.message,
                extinguisherId: input.extinguisherId ?? null,
                channel: prisma_enums_js_1.NotificationChannel.SYSTEM,
            },
        });
        if (input.sendEmail) {
            const user = await this.prisma.user.findUnique({
                where: { id: input.userId },
                select: { email: true },
            });
            if (user) {
                await this.prisma.notification.create({
                    data: {
                        userId: input.userId,
                        type: input.type,
                        message: input.message,
                        extinguisherId: input.extinguisherId ?? null,
                        channel: prisma_enums_js_1.NotificationChannel.EMAIL,
                    },
                });
                await this.mailer.sendMail({
                    to: user.email,
                    subject: input.emailSubject ?? 'Fire Extinguisher Management System',
                    text: input.message,
                });
            }
        }
        return notification;
    }
    async notifyAdmins(input) {
        const admins = await this.prisma.user.findMany({
            where: { role: 'ADMIN', isActive: true },
            select: { id: true },
        });
        await Promise.all(admins.map((admin) => this.createNotification({ ...input, userId: admin.id })));
    }
    async findForUser(userId, page = 1, limit = 10, isRead) {
        const { skip, take, page: p, limit: l } = (0, pagination_dto_js_1.getSkipTake)(page, limit);
        const where = {
            userId,
            channel: prisma_enums_js_1.NotificationChannel.SYSTEM,
            ...(isRead === undefined ? {} : { isRead }),
        };
        const [data, total] = await Promise.all([
            this.prisma.notification.findMany({
                where,
                orderBy: { sentAt: 'desc' },
                skip,
                take,
                include: {
                    extinguisher: { select: { serialNumber: true, location: true } },
                },
            }),
            this.prisma.notification.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_js_1.buildPaginationMeta)(total, p, l) };
    }
    async markRead(id, userId) {
        const notification = await this.prisma.notification.findUnique({
            where: { id },
        });
        if (!notification || notification.userId !== userId) {
            throw new common_1.NotFoundException(`Notification ${id} not found`);
        }
        return this.prisma.notification.update({
            where: { id },
            data: { isRead: true },
        });
    }
    async markAllRead(userId) {
        const result = await this.prisma.notification.updateMany({
            where: { userId, isRead: false },
            data: { isRead: true },
        });
        return { updated: result.count };
    }
};
exports.NotificationsService = NotificationsService;
exports.NotificationsService = NotificationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        mailer_service_js_1.MailerService])
], NotificationsService);
//# sourceMappingURL=notifications.service.js.map