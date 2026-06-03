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
exports.InspectionsService = void 0;
const common_1 = require("@nestjs/common");
const pagination_dto_js_1 = require("../common/dto/pagination.dto.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const mailer_service_js_1 = require("../mailer/mailer.service.js");
const notifications_service_js_1 = require("../notifications/notifications.service.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const inspectionInclude = {
    extinguisher: {
        select: { id: true, serialNumber: true, location: true, type: true },
    },
    scheduledBy: { select: { id: true, firstName: true, lastName: true } },
    inspector: { select: { id: true, firstName: true, lastName: true } },
};
let InspectionsService = class InspectionsService {
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
        if (dto.inspectorId) {
            const inspector = await this.prisma.user.findUnique({
                where: { id: dto.inspectorId },
            });
            if (!inspector) {
                throw new common_1.NotFoundException(`Inspector ${dto.inspectorId} not found`);
            }
        }
        const inspection = await this.prisma.inspection.create({
            data: {
                extinguisherId: dto.extinguisherId,
                scheduledById: currentUserId,
                inspectorId: dto.inspectorId ?? null,
                scheduledAt: new Date(dto.scheduledAt),
                status: prisma_enums_js_1.InspectionStatus.SCHEDULED,
                notes: dto.notes ?? null,
            },
            include: inspectionInclude,
        });
        const message = `Inspection scheduled for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}) on ${inspection.scheduledAt.toISOString()}.`;
        const sendEmail = this.mailer.isConfigured;
        if (dto.inspectorId) {
            await this.notifications.createNotification({
                userId: dto.inspectorId,
                type: prisma_enums_js_1.NotificationType.INSPECTION_SCHEDULED,
                message,
                extinguisherId: extinguisher.id,
                emailSubject: 'FEMS — New inspection assigned',
                sendEmail,
            });
        }
        await this.notifications.notifyAdmins({
            type: prisma_enums_js_1.NotificationType.INSPECTION_SCHEDULED,
            message,
            extinguisherId: extinguisher.id,
            emailSubject: 'FEMS — Inspection scheduled',
            sendEmail,
        });
        return inspection;
    }
    async findAll(query) {
        const { skip, take, page, limit } = (0, pagination_dto_js_1.getSkipTake)(query.page, query.limit);
        const where = {
            ...(query.status ? { status: query.status } : {}),
            ...(query.extinguisherId ? { extinguisherId: query.extinguisherId } : {}),
            ...(query.inspectorId ? { inspectorId: query.inspectorId } : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.inspection.findMany({
                where,
                include: inspectionInclude,
                orderBy: { scheduledAt: 'desc' },
                skip,
                take,
            }),
            this.prisma.inspection.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_js_1.buildPaginationMeta)(total, page, limit) };
    }
    async findOne(id) {
        const inspection = await this.prisma.inspection.findUnique({
            where: { id },
            include: {
                ...inspectionInclude,
                maintenanceLogs: { orderBy: { actionDate: 'desc' } },
            },
        });
        if (!inspection) {
            throw new common_1.NotFoundException(`Inspection ${id} not found`);
        }
        return inspection;
    }
    async update(id, dto) {
        const current = await this.prisma.inspection.findUnique({ where: { id } });
        if (!current) {
            throw new common_1.NotFoundException(`Inspection ${id} not found`);
        }
        if (dto.inspectorId) {
            const inspector = await this.prisma.user.findUnique({
                where: { id: dto.inspectorId },
            });
            if (!inspector) {
                throw new common_1.NotFoundException(`Inspector ${dto.inspectorId} not found`);
            }
        }
        const completedAt = dto.status === prisma_enums_js_1.InspectionStatus.COMPLETED
            ? (current.completedAt ?? new Date())
            : undefined;
        return this.prisma.inspection.update({
            where: { id },
            data: {
                status: dto.status,
                result: dto.result,
                notes: dto.notes,
                inspectorId: dto.inspectorId,
                completedAt,
            },
            include: inspectionInclude,
        });
    }
    async remove(id) {
        const current = await this.prisma.inspection.findUnique({ where: { id } });
        if (!current) {
            throw new common_1.NotFoundException(`Inspection ${id} not found`);
        }
        await this.prisma.inspection.delete({ where: { id } });
        return { message: 'Inspection deleted successfully' };
    }
};
exports.InspectionsService = InspectionsService;
exports.InspectionsService = InspectionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService,
        notifications_service_js_1.NotificationsService,
        mailer_service_js_1.MailerService])
], InspectionsService);
//# sourceMappingURL=inspections.service.js.map