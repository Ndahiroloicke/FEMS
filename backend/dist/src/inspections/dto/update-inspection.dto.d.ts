import { InspectionStatus } from '../../common/prisma-enums.js';
export declare class UpdateInspectionDto {
    status?: InspectionStatus;
    result?: string;
    notes?: string;
    inspectorId?: string;
}
