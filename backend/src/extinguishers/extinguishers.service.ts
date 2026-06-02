import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ExtinguisherStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateExtinguisherDto } from './dto/create-extinguisher.dto.js';
import { UpdateExtinguisherDto } from './dto/update-extinguisher.dto.js';

@Injectable()
export class ExtinguishersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateExtinguisherDto) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException(`Customer ${dto.customerId} not found`);
    }

    const existing = await this.prisma.fireExtinguisher.findUnique({
      where: { serialNumber: dto.serialNumber },
    });

    if (existing) {
      throw new ConflictException(
        `Extinguisher ${dto.serialNumber} is already registered`,
      );
    }

    return this.prisma.fireExtinguisher.create({
      data: {
        serialNumber: dto.serialNumber,
        customerId: dto.customerId,
        purchaseDate: new Date(dto.purchaseDate),
        expiryDate: new Date(dto.expiryDate),
        type: dto.type,
        capacity: dto.capacity,
        status: dto.status ?? ExtinguisherStatus.ACTIVE,
      },
      include: { customer: true },
    });
  }

  findAll(filters?: { status?: ExtinguisherStatus; customerId?: string; expiringWithinDays?: number }) {
    const now = new Date();
    const expiryUpperBound = filters?.expiringWithinDays
      ? new Date(now.getTime() + filters.expiringWithinDays * 24 * 60 * 60 * 1000)
      : undefined;

    return this.prisma.fireExtinguisher.findMany({
      where: {
        status: filters?.status,
        customerId: filters?.customerId,
        ...(expiryUpperBound
          ? {
              expiryDate: { lte: expiryUpperBound, gte: now },
              status: { not: ExtinguisherStatus.RETURNED },
            }
          : {}),
      },
      include: { customer: true },
      orderBy: { expiryDate: 'asc' },
    });
  }

  async findOne(id: string) {
    const extinguisher = await this.prisma.fireExtinguisher.findUnique({
      where: { id },
      include: {
        customer: true,
        notifications: { orderBy: { sentAt: 'desc' }, take: 10 },
        escalations: { orderBy: { createdAt: 'desc' } },
      },
    });

    if (!extinguisher) {
      throw new NotFoundException(`Extinguisher ${id} not found`);
    }

    return extinguisher;
  }

  async update(id: string, dto: UpdateExtinguisherDto) {
    await this.findOne(id);

    return this.prisma.fireExtinguisher.update({
      where: { id },
      data: {
        ...dto,
        expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : undefined,
      },
      include: { customer: true },
    });
  }

  async markDelivered(id: string) {
    return this.updateStatus(id, ExtinguisherStatus.DELIVERED);
  }

  async markReturned(id: string) {
    return this.updateStatus(id, ExtinguisherStatus.RETURNED);
  }

  private async updateStatus(id: string, status: ExtinguisherStatus) {
    await this.findOne(id);

    return this.prisma.fireExtinguisher.update({
      where: { id },
      data: { status },
      include: { customer: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.fireExtinguisher.delete({ where: { id } });
  }
}
