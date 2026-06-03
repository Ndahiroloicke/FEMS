import { InspectionStatus } from '../../common/prisma-enums.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';
export declare class QueryInspectionDto extends PaginationDto {
    status?: InspectionStatus;
    extinguisherId?: string;
    inspectorId?: string;
}
