import { ExtinguisherStatus } from '../../generated/prisma/client';
export declare class CreateExtinguisherDto {
    serialNumber: string;
    customerId: string;
    purchaseDate: string;
    expiryDate: string;
    type?: string;
    capacity?: string;
    status?: ExtinguisherStatus;
}
