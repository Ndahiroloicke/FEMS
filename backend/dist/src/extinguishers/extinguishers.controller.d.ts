import { ExtinguisherStatus } from '../generated/prisma/client';
import { CreateExtinguisherDto } from './dto/create-extinguisher.dto.js';
import { UpdateExtinguisherDto } from './dto/update-extinguisher.dto.js';
import { ExtinguishersService } from './extinguishers.service.js';
export declare class ExtinguishersController {
    private readonly extinguishersService;
    constructor(extinguishersService: ExtinguishersService);
    create(dto: CreateExtinguisherDto): Promise<{
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: ExtinguisherStatus;
        customerId: string;
    }>;
    findAll(status?: ExtinguisherStatus, customerId?: string, expiringWithinDays?: string): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: ExtinguisherStatus;
        customerId: string;
    })[]>;
    findOne(id: string): Promise<{
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
        notifications: {
            id: string;
            type: import("../generated/prisma/enums").NotificationType;
            customerId: string;
            channel: import("../generated/prisma/enums").NotificationChannel;
            message: string;
            sentAt: Date;
            extinguisherId: string;
        }[];
        escalations: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums").EscalationStatus;
            customerId: string;
            extinguisherId: string;
            reason: string;
            reportedAt: Date | null;
            resolvedAt: Date | null;
            notes: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: ExtinguisherStatus;
        customerId: string;
    }>;
    update(id: string, dto: UpdateExtinguisherDto): Promise<{
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: ExtinguisherStatus;
        customerId: string;
    }>;
    markDelivered(id: string): Promise<{
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: ExtinguisherStatus;
        customerId: string;
    }>;
    markReturned(id: string): Promise<{
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: ExtinguisherStatus;
        customerId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        serialNumber: string;
        type: string | null;
        capacity: string | null;
        purchaseDate: Date;
        expiryDate: Date;
        status: ExtinguisherStatus;
        customerId: string;
    }>;
}
