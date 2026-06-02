import { DashboardService } from './dashboard.service.js';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getSummary(): Promise<{
        totalCustomers: number;
        totalExtinguishers: number;
        activeExtinguishers: number;
        deliveredExtinguishers: number;
        expiringSoon: number;
        expiredNotReturned: number;
        pendingEscalations: number;
        recentNotifications: ({
            customer: {
                fullName: string;
            };
            extinguisher: {
                serialNumber: string;
            };
        } & {
            id: string;
            type: import("../common/prisma-enums.js").NotificationType;
            customerId: string;
            channel: import("../common/prisma-enums.js").NotificationChannel;
            message: string;
            sentAt: Date;
            extinguisherId: string;
        })[];
    }>;
}
