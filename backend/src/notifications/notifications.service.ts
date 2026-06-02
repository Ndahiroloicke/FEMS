import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(customerId?: string) {
    return this.prisma.notification.findMany({
      where: customerId ? { customerId } : undefined,
      include: {
        customer: { select: { fullName: true, phone: true, email: true } },
        extinguisher: { select: { serialNumber: true, expiryDate: true } },
      },
      orderBy: { sentAt: 'desc' },
    });
  }

  findOne(id: string) {
    return this.prisma.notification.findUniqueOrThrow({
      where: { id },
      include: {
        customer: true,
        extinguisher: true,
      },
    });
  }
}
