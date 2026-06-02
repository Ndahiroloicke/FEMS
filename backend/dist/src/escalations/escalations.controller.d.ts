import { EscalationStatus } from '../generated/prisma/client';
import { UpdateEscalationDto } from './dto/update-escalation.dto.js';
import { EscalationsService } from './escalations.service.js';
export declare class EscalationsController {
    private readonly escalationsService;
    constructor(escalationsService: EscalationsService);
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
    markReported(id: string, notes?: string): Promise<{
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
