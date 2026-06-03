import { Role } from '../common/prisma-enums.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { ListUsersDto } from './dto/list-users.dto.js';
import { UpdateProfileDto } from './dto/update-profile.dto.js';
import { UpdateRoleDto } from './dto/update-role.dto.js';
import { UpdateStatusDto } from './dto/update-status.dto.js';
import { UsersService } from './users.service.js';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(userId: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: Role;
        isActive: boolean;
    }>;
    updateMe(userId: string, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: Role;
        isActive: boolean;
    }>;
    changePassword(userId: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    findAll(query: ListUsersDto): Promise<import("../common/dto/pagination.dto.js").PaginatedResult<unknown>>;
    updateRole(id: string, dto: UpdateRoleDto): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        firstName: string;
        lastName: string;
        role: Role;
        isActive: boolean;
    }>;
    updateStatus(id: string, dto: UpdateStatusDto): Promise<{
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
