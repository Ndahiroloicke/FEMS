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
exports.EscalationsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let EscalationsService = class EscalationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll(status) {
        return this.prisma.escalation.findMany({
            where: status ? { status } : undefined,
            include: {
                customer: { select: { fullName: true, nationalId: true, phone: true } },
                extinguisher: { select: { serialNumber: true, expiryDate: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const escalation = await this.prisma.escalation.findUnique({
            where: { id },
            include: { customer: true, extinguisher: true },
        });
        if (!escalation) {
            throw new common_1.NotFoundException(`Escalation ${id} not found`);
        }
        return escalation;
    }
    async update(id, dto) {
        await this.findOne(id);
        const now = new Date();
        const data = { ...dto };
        if (dto.status === client_1.EscalationStatus.REPORTED) {
            data.reportedAt = now;
        }
        if (dto.status === client_1.EscalationStatus.RESOLVED) {
            data.resolvedAt = now;
        }
        return this.prisma.escalation.update({
            where: { id },
            data,
            include: {
                customer: true,
                extinguisher: true,
            },
        });
    }
    async markReportedToPolice(id, notes) {
        return this.update(id, {
            status: client_1.EscalationStatus.REPORTED,
            notes,
        });
    }
};
exports.EscalationsService = EscalationsService;
exports.EscalationsService = EscalationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], EscalationsService);
//# sourceMappingURL=escalations.service.js.map