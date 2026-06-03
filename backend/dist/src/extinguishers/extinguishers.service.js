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
const pagination_dto_js_1 = require("../common/dto/pagination.dto.js");
const prisma_enums_js_1 = require("../common/prisma-enums.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
let ExtinguishersService = class ExtinguishersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    assertDateOrder(installation, expiry) {
        if (expiry <= installation) {
            throw new common_1.BadRequestException('expiryDate must be after installationDate');
        }
    }
    async create(dto) {
        const existing = await this.prisma.fireExtinguisher.findUnique({
            where: { serialNumber: dto.serialNumber },
        });
        if (existing) {
            throw new common_1.ConflictException(`Extinguisher ${dto.serialNumber} is already registered`);
        }
        const installationDate = new Date(dto.installationDate);
        const expiryDate = new Date(dto.expiryDate);
        this.assertDateOrder(installationDate, expiryDate);
        return this.prisma.fireExtinguisher.create({
            data: {
                serialNumber: dto.serialNumber,
                location: dto.location,
                type: dto.type,
                size: dto.size,
                installationDate,
                expiryDate,
                status: dto.status ?? undefined,
            },
        });
    }
    async findAll(query, currentUser) {
        const { skip, take, page, limit } = (0, pagination_dto_js_1.getSkipTake)(query.page, query.limit);
        const ownerFilter = currentUser.role === prisma_enums_js_1.Role.USER ? { ownerId: currentUser.id } : {};
        const where = {
            ...ownerFilter,
            ...(query.status ? { status: query.status } : {}),
            ...(query.type ? { type: query.type } : {}),
            ...(query.search
                ? {
                    OR: [
                        {
                            serialNumber: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            location: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                    ],
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.fireExtinguisher.findMany({
                where,
                orderBy: { createdAt: 'desc' },
                skip,
                take,
            }),
            this.prisma.fireExtinguisher.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_js_1.buildPaginationMeta)(total, page, limit) };
    }
    async findOne(id, currentUser) {
        const extinguisher = await this.prisma.fireExtinguisher.findUnique({
            where: { id },
            include: {
                inspections: {
                    orderBy: { scheduledAt: 'desc' },
                    take: 10,
                    include: {
                        inspector: {
                            select: { id: true, firstName: true, lastName: true },
                        },
                    },
                },
                maintenanceLogs: {
                    orderBy: { actionDate: 'desc' },
                    take: 10,
                    include: {
                        inspector: {
                            select: { id: true, firstName: true, lastName: true },
                        },
                    },
                },
            },
        });
        if (!extinguisher) {
            throw new common_1.NotFoundException(`Extinguisher ${id} not found`);
        }
        if (currentUser.role === prisma_enums_js_1.Role.USER &&
            extinguisher.ownerId !== currentUser.id) {
            throw new common_1.ForbiddenException('You do not have access to this extinguisher');
        }
        return extinguisher;
    }
    async update(id, dto) {
        const current = await this.prisma.fireExtinguisher.findUnique({
            where: { id },
        });
        if (!current) {
            throw new common_1.NotFoundException(`Extinguisher ${id} not found`);
        }
        if (dto.serialNumber && dto.serialNumber !== current.serialNumber) {
            const dup = await this.prisma.fireExtinguisher.findUnique({
                where: { serialNumber: dto.serialNumber },
            });
            if (dup) {
                throw new common_1.ConflictException(`Extinguisher ${dto.serialNumber} is already registered`);
            }
        }
        const installationDate = dto.installationDate
            ? new Date(dto.installationDate)
            : current.installationDate;
        const expiryDate = dto.expiryDate
            ? new Date(dto.expiryDate)
            : current.expiryDate;
        this.assertDateOrder(installationDate, expiryDate);
        return this.prisma.fireExtinguisher.update({
            where: { id },
            data: {
                serialNumber: dto.serialNumber,
                location: dto.location,
                type: dto.type,
                size: dto.size,
                status: dto.status,
                installationDate: dto.installationDate ? installationDate : undefined,
                expiryDate: dto.expiryDate ? expiryDate : undefined,
            },
        });
    }
    async assign(id, dto) {
        const current = await this.prisma.fireExtinguisher.findUnique({
            where: { id },
        });
        if (!current) {
            throw new common_1.NotFoundException(`Extinguisher ${id} not found`);
        }
        if (dto.ownerId) {
            if (current.status === prisma_enums_js_1.ExtinguisherStatus.OUT_OF_SERVICE ||
                current.status === prisma_enums_js_1.ExtinguisherStatus.NEEDS_MAINTENANCE) {
                throw new common_1.BadRequestException('Cannot assign an extinguisher that is out of service or needs maintenance. Update its status first.');
            }
            const owner = await this.prisma.user.findUnique({
                where: { id: dto.ownerId },
            });
            if (!owner) {
                throw new common_1.NotFoundException(`User ${dto.ownerId} not found`);
            }
        }
        return this.prisma.fireExtinguisher.update({
            where: { id },
            data: { ownerId: dto.ownerId ?? null },
            include: {
                owner: {
                    select: { id: true, firstName: true, lastName: true, email: true },
                },
            },
        });
    }
    async remove(id) {
        const current = await this.prisma.fireExtinguisher.findUnique({
            where: { id },
        });
        if (!current) {
            throw new common_1.NotFoundException(`Extinguisher ${id} not found`);
        }
        await this.prisma.fireExtinguisher.delete({ where: { id } });
        return { message: 'Extinguisher deleted successfully' };
    }
};
exports.ExtinguishersService = ExtinguishersService;
exports.ExtinguishersService = ExtinguishersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], ExtinguishersService);
//# sourceMappingURL=extinguishers.service.js.map