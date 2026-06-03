import { ExtinguisherStatus, ExtinguisherType } from '../../common/prisma-enums.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
export declare class QueryExtinguisherDto extends PaginationDto {
    status?: ExtinguisherStatus;
    type?: ExtinguisherType;
    search?: string;
}
