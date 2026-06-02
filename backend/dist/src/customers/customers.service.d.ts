import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';
export declare class CustomersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCustomerDto): Promise<{
        id: string;
        fullName: string;
        nationalId: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(search?: string): import("../generated/prisma/internal/prismaNamespace.js").PrismaPromise<({
        _count: {
            extinguishers: number;
        };
    } & {
        id: string;
        fullName: string;
        nationalId: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        _count: {
            notifications: number;
            escalations: number;
        };
        extinguishers: {
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
        }[];
    } & {
        id: string;
        fullName: string;
        nationalId: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, dto: UpdateCustomerDto): Promise<{
        id: string;
        fullName: string;
        nationalId: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        fullName: string;
        nationalId: string;
        email: string | null;
        phone: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
