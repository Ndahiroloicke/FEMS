import { ExtinguisherStatus, ExtinguisherType } from '../../common/prisma-enums.js';
export declare const EXTINGUISHER_SIZES: readonly ["2.5lbs", "5lbs", "9lbs", "12lbs"];
export type ExtinguisherSize = (typeof EXTINGUISHER_SIZES)[number];
export declare class CreateExtinguisherDto {
    serialNumber: string;
    location: string;
    type: ExtinguisherType;
    size: ExtinguisherSize;
    installationDate: string;
    expiryDate: string;
    status?: ExtinguisherStatus;
}
