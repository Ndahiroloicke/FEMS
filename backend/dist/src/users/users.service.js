"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const pagination_dto_js_1 = require("../common/dto/pagination.dto.js");
const prisma_service_js_1 = require("../prisma/prisma.service.js");
const user_select_js_1 = require("./user.select.js");
const BCRYPT_ROUNDS = 10;
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: user_select_js_1.safeUserSelect,
        });
        if (!user) {
            throw new common_1.NotFoundException(`User ${id} not found`);
        }
        return user;
    }
    async updateProfile(id, dto) {
        if (dto.email) {
            const existing = await this.prisma.user.findUnique({
                where: { email: dto.email.toLowerCase() },
            });
            if (existing && existing.id !== id) {
                throw new common_1.ConflictException('Email is already in use');
            }
        }
        return this.prisma.user.update({
            where: { id },
            data: {
                firstName: dto.firstName?.trim(),
                lastName: dto.lastName?.trim(),
                email: dto.email?.toLowerCase(),
            },
            select: user_select_js_1.safeUserSelect,
        });
    }
    async changePassword(id, dto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User ${id} not found`);
        }
        const matches = await bcrypt.compare(dto.currentPassword, user.passwordHash);
        if (!matches) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const passwordHash = await bcrypt.hash(dto.newPassword, BCRYPT_ROUNDS);
        await this.prisma.user.update({
            where: { id },
            data: { passwordHash },
        });
        return { message: 'Password updated successfully' };
    }
    async findAll(query) {
        const { skip, take, page, limit } = (0, pagination_dto_js_1.getSkipTake)(query.page, query.limit);
        const where = {
            ...(query.role ? { role: query.role } : {}),
            ...(query.search
                ? {
                    OR: [
                        {
                            firstName: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            lastName: {
                                contains: query.search,
                                mode: 'insensitive',
                            },
                        },
                        {
                            email: { contains: query.search, mode: 'insensitive' },
                        },
                    ],
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                select: user_select_js_1.safeUserSelect,
                orderBy: { createdAt: 'desc' },
                skip,
                take,
            }),
            this.prisma.user.count({ where }),
        ]);
        return { data, meta: (0, pagination_dto_js_1.buildPaginationMeta)(total, page, limit) };
    }
    async updateRole(id, role) {
        await this.getById(id);
        return this.prisma.user.update({
            where: { id },
            data: { role },
            select: user_select_js_1.safeUserSelect,
        });
    }
    async updateStatus(id, isActive) {
        await this.getById(id);
        return this.prisma.user.update({
            where: { id },
            data: { isActive },
            select: user_select_js_1.safeUserSelect,
        });
    }
    async remove(id, currentUserId) {
        if (id === currentUserId) {
            throw new common_1.BadRequestException('You cannot delete your own account');
        }
        await this.getById(id);
        await this.prisma.user.delete({ where: { id } });
        return { message: 'User deleted successfully' };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_js_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map