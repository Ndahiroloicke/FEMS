import { Role } from '../common/prisma-enums.js';
import { type PaginatedResult } from '../common/dto/pagination.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ListUsersDto } from './dto/list-users.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: Role;
        isActive: boolean;
    }>;
    updateProfile(id: string, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: Role;
        isActive: boolean;
    }>;
    changePassword(id: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    findAll(query: ListUsersDto): Promise<PaginatedResult<unknown>>;
    updateRole(id: string, role: Role): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: Role;
        isActive: boolean;
    }>;
    updateStatus(id: string, isActive: boolean): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: Role;
        isActive: boolean;
    }>;
    remove(id: string, currentUserId: string): Promise<{
        message: string;
    }>;
}
