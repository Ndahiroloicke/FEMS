import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

@Injectable()
export class CustomersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateCustomerDto) {
    const existing = await this.prisma.customer.findUnique({
      where: { nationalId: dto.nationalId },
    });

    if (existing) {
      throw new ConflictException(
        `Customer with national ID ${dto.nationalId} already exists`,
      );
    }

    return this.prisma.customer.create({ data: dto });
  }

  findAll(search?: string) {
    return this.prisma.customer.findMany({
      where: search
        ? {
            OR: [
              { fullName: { contains: search, mode: 'insensitive' } },
              { nationalId: { contains: search, mode: 'insensitive' } },
              { phone: { contains: search, mode: 'insensitive' } },
            ],
          }
        : undefined,
      include: {
        _count: { select: { extinguishers: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id },
      include: {
        extinguishers: { orderBy: { expiryDate: 'asc' } },
        _count: { select: { notifications: true, escalations: true } },
      },
    });

    if (!customer) {
      throw new NotFoundException(`Customer ${id} not found`);
    }

    return customer;
  }

  async update(id: string, dto: UpdateCustomerDto) {
    await this.findOne(id);

    if (dto.nationalId) {
      const duplicate = await this.prisma.customer.findFirst({
        where: { nationalId: dto.nationalId, NOT: { id } },
      });

      if (duplicate) {
        throw new ConflictException(
          `National ID ${dto.nationalId} is already registered`,
        );
      }
    }

    return this.prisma.customer.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.customer.delete({ where: { id } });
  }
}
