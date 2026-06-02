import { PrismaService } from '../prisma/prisma.service.js';
export declare class DashboardService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
            type: import("../generated/prisma/enums").NotificationType;
            customerId: string;
            channel: import("../generated/prisma/enums").NotificationChannel;
            message: string;
            sentAt: Date;
            extinguisherId: string;
        })[];
    }>;
}
