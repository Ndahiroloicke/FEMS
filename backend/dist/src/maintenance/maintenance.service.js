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
exports.MaintenanceService = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_js_1 = require("../common/dto/pagination.dto.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const mailer_service_js_1 = require("../mailer/mailer.service.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const maintenanceInclude = {
    extinguisher: {
        select: { id: true, serialNumber: true, location: true },
    },
    inspector: { select: { id: true, firstName: true, lastName: true } },
};
let MaintenanceService = class MaintenanceService {
    constructor(prisma, notifications, mailer) {
        this.prisma = prisma;
        this.notifications = notifications;
        this.mailer = mailer;
    }
    async create(dto, currentUserId) {
        const extinguisher = await this.prisma.fireExtinguisher.findUnique({
            where: { id: dto.extinguisherId },
        });
        if (!extinguisher) {
            throw new common_1.NotFoundException(`Extinguisher ${dto.extinguisherId} not found`);
        }
        if (dto.inspectionId) {
            const inspection = await this.prisma.inspection.findUnique({
                where: { id: dto.inspectionId },
            });
            if (!inspection) {
                throw new common_1.NotFoundException(`Inspection ${dto.inspectionId} not found`);
            }
        }
        const log = await this.prisma.maintenanceLog.create({
            data: {
                extinguisherId: dto.extinguisherId,
                inspectorId: currentUserId,
                inspectionId: dto.inspectionId ?? null,
                actionsTaken: dto.actionsTaken,
                conditionNoted: dto.conditionNoted,
                actionDate: new Date(dto.actionDate),
            },
            include: maintenanceInclude,
        });
        const message = `Maintenance logged for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}): ${dto.actionsTaken} — condition ${dto.conditionNoted}.`;
        await this.notifications.notifyAdmins({
            type: prisma_enums_js_1.NotificationType.MAINTENANCE_LOGGED,
            message,
            extinguisherId: extinguisher.id,
            emailSubject: 'FEMS — Maintenance logged',
            sendEmail: this.mailer.isConfigured,
        });
        return log;
    }
    async findAll(query) {
        const { skip, take, page, limit } = (0, pagination_dto_js_1.getSkipTake)(query.page, query.limit);
        const where = {
            ...(query.extinguisherId ? { extinguisherId: query.extinguisherId } : {}),
            ...(query.inspectorId ? { inspectorId: query.inspectorId } : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.maintenanceLog.findMany({
                where,
                include: maintenanceInclude,
                orderBy: { actionDate: 'desc' },
                skip,
                take,
            }),
            this.prisma.maintenanceLog.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_js_1.buildPaginationMeta)(total, page, limit) };
    }
    async findOne(id) {
        const log = await this.prisma.maintenanceLog.findUnique({
            where: { id },
            include: { ...maintenanceInclude, inspection: true },
        });
        if (!log) {
            throw new common_1.NotFoundException(`Maintenance log ${id} not found`);
        }
        return log;
    }
};
exports.MaintenanceService = MaintenanceService;
exports.MaintenanceService = MaintenanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        notifications_service_js_1.NotificationsService,
        mailer_service_js_1.MailerService])
], MaintenanceService);
//# sourceMappingURL=maintenance.service.js.map