import { PrismaService } from '../prisma/prisma.service.js';
export declare class NotificationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(customerId?: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        customer: {
            fullName: string;
            email: string | null;
            phone: string;
        };
        extinguisher: {
            serialNumber: string;
            expiryDate: Date;
        };
    } & {
        id: string;
        type: import("../common/prisma-enums.js").NotificationType;
        customerId: string;
        channel: import("../common/prisma-enums.js").NotificationChannel;
        message: string;
        sentAt: Date;
        extinguisherId: string;
    })[]>;
    findOne(id: string): import("../generated/prisma/models.js").Prisma__NotificationClient<{
        customer: {
            id: string;
            fullName: string;
            nationalId: string;
            email: string | null;
            phone: string;
            address: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        extinguisher: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            serialNumber: string;
            type: string | null;
            capacity: string | null;
            purchaseDate: Date;
            expiryDate: Date;
            status: import("../common/prisma-enums.js").ExtinguisherStatus;
            customerId: string;
        };
    } & {
        id: string;
        type: import("../common/prisma-enums.js").NotificationType;
        customerId: string;
        channel: import("../common/prisma-enums.js").NotificationChannel;
        message: string;
        sentAt: Date;
        extinguisherId: string;
    }, never, import("@prisma/client/runtime/client.js").DefaultArgs, {
        omit: import("../generated/prisma/internal/prismaNamespace.js").GlobalOmitConfig | undefined;
    }>;
}
