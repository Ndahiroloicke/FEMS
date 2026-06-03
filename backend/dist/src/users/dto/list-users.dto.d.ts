import { Role } from '../../common/prisma-enums.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
export declare class ListUsersDto extends PaginationDto {
    role?: Role;
    search?: string;
}
