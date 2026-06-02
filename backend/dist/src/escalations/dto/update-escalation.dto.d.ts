import { EscalationStatus } from '../../generated/prisma/client';
export declare class UpdateEscalationDto {
    status?: EscalationStatus;
    notes?: string;
}
