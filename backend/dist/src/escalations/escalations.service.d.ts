import { EscalationStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateEscalationDto } from './dto/update-escalation.dto.js';
export declare class EscalationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(status?: EscalationStatus): import("../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        customer: {
            fullName: string;
            nationalId: string;
            phone: string;
        };
        extinguisher: {
            serialNumber: string;
            expiryDate: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: EscalationStatus;
        customerId: string;
        extinguisherId: string;
        reason: string;
        reportedAt: Date | null;
        resolvedAt: Date | null;
        notes: string | null;
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
        extinguisher: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            serialNumber: string;
            type: string | null;
            capacity: string | null;
            purchaseDate: Date;
            expiryDate: Date;
            status: import("../generated/prisma/enums").ExtinguisherStatus;
            customerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: EscalationStatus;
        customerId: string;
        extinguisherId: string;
        reason: string;
        reportedAt: Date | null;
        resolvedAt: Date | null;
        notes: string | null;
    }>;
    update(id: string, dto: UpdateEscalationDto): Promise<{
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
            status: import("../generated/prisma/enums").ExtinguisherStatus;
            customerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: EscalationStatus;
        customerId: string;
        extinguisherId: string;
        reason: string;
        reportedAt: Date | null;
        resolvedAt: Date | null;
        notes: string | null;
    }>;
    markReportedToPolice(id: string, notes?: string): Promise<{
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
            status: import("../generated/prisma/enums").ExtinguisherStatus;
            customerId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: EscalationStatus;
        customerId: string;
        extinguisherId: string;
        reason: string;
        reportedAt: Date | null;
        resolvedAt: Date | null;
        notes: string | null;
    }>;
}
