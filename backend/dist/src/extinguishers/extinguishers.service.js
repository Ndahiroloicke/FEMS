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
exports.ExtinguishersService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("../generated/prisma/client");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let ExtinguishersService = class ExtinguishersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const customer = await this.prisma.customer.findUnique({
            where: { id: dto.customerId },
        });
        if (!customer) {
            throw new common_1.NotFoundException(`Customer ${dto.customerId} not found`);
        }
        const existing = await this.prisma.fireExtinguisher.findUnique({
            where: { serialNumber: dto.serialNumber },
        });
        if (existing) {
            throw new common_1.ConflictException(`Extinguisher ${dto.serialNumber} is already registered`);
        }
        return this.prisma.fireExtinguisher.create({
            data: {
                serialNumber: dto.serialNumber,
                customerId: dto.customerId,
                purchaseDate: new Date(dto.purchaseDate),
                expiryDate: new Date(dto.expiryDate),
                type: dto.type,
                capacity: dto.capacity,
                status: dto.status ?? client_1.ExtinguisherStatus.ACTIVE,
            },
            include: { customer: true },
        });
    }
    findAll(filters) {
        const now = new Date();
        const expiryUpperBound = filters?.expiringWithinDays
            ? new Date(now.getTime() + filters.expiringWithinDays * 24 * 60 * 60 * 1000)
            : undefined;
        return this.prisma.fireExtinguisher.findMany({
            where: {
                status: filters?.status,
                customerId: filters?.customerId,
                ...(expiryUpperBound
                    ? {
                        expiryDate: { lte: expiryUpperBound, gte: now },
                        status: { not: client_1.ExtinguisherStatus.RETURNED },
                    }
                    : {}),
            },
            include: { customer: true },
            orderBy: { expiryDate: 'asc' },
        });
    }
    async findOne(id) {
        const extinguisher = await this.prisma.fireExtinguisher.findUnique({
            where: { id },
            include: {
                customer: true,
                notifications: { orderBy: { sentAt: 'desc' }, take: 10 },
                escalations: { orderBy: { createdAt: 'desc' } },
            },
        });
        if (!extinguisher) {
            throw new common_1.NotFoundException(`Extinguisher ${id} not found`);
        }
        return extinguisher;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.fireExtinguisher.update({
            where: { id },
            data: {
                ...dto,
                expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
            },
            include: { customer: true },
        });
    }
    async markDelivered(id) {
        return this.updateStatus(id, client_1.ExtinguisherStatus.DELIVERED);
    }
    async markReturned(id) {
        return this.updateStatus(id, client_1.ExtinguisherStatus.RETURNED);
    }
    async updateStatus(id, status) {
        await this.findOne(id);
        return this.prisma.fireExtinguisher.update({
            where: { id },
            data: { status },
            include: { customer: true },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.fireExtinguisher.delete({ where: { id } });
    }
};
exports.ExtinguishersService = ExtinguishersService;
exports.ExtinguishersService = ExtinguishersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ExtinguishersService);
//# sourceMappingURL=extinguishers.service.js.map