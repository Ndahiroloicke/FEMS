import { MaintenanceCondition } from '../../common/prisma-enums.js';
export declare class CreateMaintenanceDto {
    extinguisherId: string;
    actionsTaken: string;
    actionDate: string;
    conditionNoted: MaintenanceCondition;
    inspectionId?: string;
}
