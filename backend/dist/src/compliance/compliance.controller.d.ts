import { ComplianceService } from './compliance.service.js';
export declare class ComplianceController {
    private readonly complianceService;
    constructor(complianceService: ComplianceService);
    runChecks(): Promise<{
        warnings: {
            processed: number;
        };
        escalations: {
            processed: number;
        };
    }>;
}
