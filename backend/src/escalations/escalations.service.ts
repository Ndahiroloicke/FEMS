import { Injectable, NotFoundException } from '@nestjs/common';
import { EscalationStatus } from '../generated/prisma/client';
import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateEscalationDto } from './dto/update-escalation.dto.js';

@Injectable()
export class EscalationsService {
  constructor(private readonly prisma: PrismaService) {}

  findAll(status?: EscalationStatus) {
    return this.prisma.escalation.findMany({
      where: status ? { status } : undefined,
      include: {
        customer: { select: { fullName: true, nationalId: true, phone: true } },
        extinguisher: { select: { serialNumber: true, expiryDate: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const escalation = await this.prisma.escalation.findUnique({
      where: { id },
      include: { customer: true, extinguisher: true },
    });

    if (!escalation) {
      throw new NotFoundException(`Escalation ${id} not found`);
    }

    return escalation;
  }

  async update(id: string, dto: UpdateEscalationDto) {
    await this.findOne(id);

    const now = new Date();
    const data: {
      status?: EscalationStatus;
      notes?: string;
      reportedAt?: Date;
      resolvedAt?: Date;
    } = { ...dto };

    if (dto.status === EscalationStatus.REPORTED) {
      data.reportedAt = now;
    }

    if (dto.status === EscalationStatus.RESOLVED) {
      data.resolvedAt = now;
    }

    return this.prisma.escalation.update({
      where: { id },
      data,
      include: {
        customer: true,
        extinguisher: true,
      },
    });
  }

  async markReportedToPolice(id: string, notes?: string) {
    return this.update(id, {
      status: EscalationStatus.REPORTED,
      notes,
    });
  }
}
