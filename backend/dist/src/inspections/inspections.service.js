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
    async notifyInspectorAssigned(inspectorId, extinguisher, scheduledAt) {
        await this.notifications.createNotification({
            userId: inspectorId,
            type: prisma_enums_js_1.NotificationType.INSPECTION_SCHEDULED,
            message: `You have been assigned an inspection for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}) on ${scheduledAt.toISOString()}.`,
            extinguisherId: extinguisher.id,
            emailSubject: 'FEMS — New inspection assigned',
            sendEmail: this.mailer.isConfigured,
        });
    }
    async create(dto, currentUser) {
        const extinguisher = await this.prisma.fireExtinguisher.findUnique({
            where: { id: dto.extinguisherId },
        });
        if (!extinguisher) {
            throw new common_1.NotFoundException(`Extinguisher ${dto.extinguisherId} not found`);
        }
        if (currentUser.role === 'USER' &&
            extinguisher.ownerId !== currentUser.id) {
            throw new common_1.ForbiddenException('You can only request inspections for your own extinguishers');
        }
        if (dto.inspectorId) {
            const inspector = await this.prisma.user.findUnique({
                where: { id: dto.inspectorId },
            });
            if (!inspector) {
                throw new common_1.NotFoundException(`Inspector ${dto.inspectorId} not found`);
            }
        }
        const initialStatus = currentUser.role === 'USER'
            ? prisma_enums_js_1.InspectionStatus.PENDING
            : prisma_enums_js_1.InspectionStatus.SCHEDULED;
        const inspection = await this.prisma.inspection.create({
            data: {
                extinguisherId: dto.extinguisherId,
                scheduledById: currentUser.id,
                inspectorId: dto.inspectorId ?? null,
                scheduledAt: new Date(dto.scheduledAt),
                status: initialStatus,
                notes: dto.notes ?? null,
            },
            include: inspectionInclude,
        });
        const sendEmail = this.mailer.isConfigured;
        if (initialStatus === prisma_enums_js_1.InspectionStatus.PENDING) {
            await this.notifications.createNotification({
                userId: currentUser.id,
                type: prisma_enums_js_1.NotificationType.INSPECTION_SCHEDULED,
                message: `Your inspection request for ${extinguisher.serialNumber} (${extinguisher.location}) has been submitted and is pending review.`,
                extinguisherId: extinguisher.id,
                emailSubject: 'FEMS — Inspection request submitted',
                sendEmail,
            });
        }
        const message = `Inspection scheduled for extinguisher ${extinguisher.serialNumber} (${extinguisher.location}) on ${inspection.scheduledAt.toISOString()}.`;
        if (dto.inspectorId) {
            await this.notifyInspectorAssigned(dto.inspectorId, extinguisher, inspection.scheduledAt);
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
    async findAll(query, currentUser) {
        const { skip, take, page, limit } = (0, pagination_dto_js_1.getSkipTake)(query.page, query.limit);
        const userFilter = currentUser.role === 'USER' ? { scheduledById: currentUser.id } : {};
        const where = {
            ...userFilter,
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
    async approve(id, dto) {
        const current = await this.prisma.inspection.findUnique({
            where: { id },
            include: {
                extinguisher: {
                    select: { id: true, serialNumber: true, location: true },
                },
            },
        });
        if (!current) {
            throw new common_1.NotFoundException(`Inspection ${id} not found`);
        }
        if (current.status !== prisma_enums_js_1.InspectionStatus.PENDING) {
            throw new common_1.BadRequestException('Only PENDING inspection requests can be approved');
        }
        const assignedInspectorId = dto.inspectorId ?? current.inspectorId ?? null;
        const updated = await this.prisma.inspection.update({
            where: { id },
            data: {
                status: prisma_enums_js_1.InspectionStatus.SCHEDULED,
                inspectorId: assignedInspectorId,
                notes: dto.notes ?? current.notes,
            },
            include: inspectionInclude,
        });
        if (current.scheduledById) {
            await this.notifications.createNotification({
                userId: current.scheduledById,
                type: prisma_enums_js_1.NotificationType.INSPECTION_SCHEDULED,
                message: `Your inspection request for extinguisher ${current.extinguisher.serialNumber} (${current.extinguisher.location}) has been approved and scheduled.`,
                extinguisherId: current.extinguisherId,
                emailSubject: 'FEMS — Inspection request approved',
                sendEmail: this.mailer.isConfigured,
            });
        }
        if (assignedInspectorId &&
            assignedInspectorId !== current.inspectorId) {
            await this.notifyInspectorAssigned(assignedInspectorId, current.extinguisher, updated.scheduledAt);
        }
        return updated;
    }
    async update(id, dto) {
        const current = await this.prisma.inspection.findUnique({
            where: { id },
            include: {
                extinguisher: {
                    select: { id: true, serialNumber: true, location: true },
                },
            },
        });
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
        const updated = await this.prisma.inspection.update({
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
        const newInspectorId = dto.inspectorId !== undefined ? dto.inspectorId : current.inspectorId;
        if (newInspectorId && newInspectorId !== current.inspectorId) {
            await this.notifyInspectorAssigned(newInspectorId, current.extinguisher, updated.scheduledAt);
        }
        return updated;
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