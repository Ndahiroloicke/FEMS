import { ExtinguisherStatus } from '../../generated/prisma/client';
export declare class UpdateExtinguisherDto {
    type?: string;
    capacity?: string;
    expiryDate?: string;
    status?: ExtinguisherStatus;
}
