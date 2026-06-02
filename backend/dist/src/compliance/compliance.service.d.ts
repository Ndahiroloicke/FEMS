import { PrismaService } from '../prisma/prisma.service.js';
export declare class ComplianceService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleDailyComplianceChecks(): Promise<void>;
    sendExpiryWarnings(): Promise<{
        processed: number;
    }>;
    escalateNonReturnedExtinguishers(): Promise<{
        processed: number;
    }>;
    runChecksNow(): Promise<{
        warnings: {
            processed: number;
        };
        escalations: {
            processed: number;
        };
    }>;
}
