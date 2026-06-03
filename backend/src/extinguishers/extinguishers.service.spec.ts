import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { ExtinguisherType } from '../common/prisma-enums.js';
import { ExtinguishersService } from './extinguishers.service.js';

describe('ExtinguishersService', () => {
  let service: ExtinguishersService;
  let prisma: any;

  beforeEach(() => {
    prisma = {
      fireExtinguisher: {
        findUnique: jest.fn(),
        findMany: jest.fn(),
        count: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };
    service = new ExtinguishersService(prisma);
  });

  const baseDto = {
    serialNumber: 'FE-001',
    location: 'Building A',
    type: ExtinguisherType.CO2,
    size: '6kg',
    installationDate: '2024-01-01',
    expiryDate: '2026-01-01',
  };

  it('creates an extinguisher when serial is unique and dates are valid', async () => {
    prisma.fireExtinguisher.findUnique.mockResolvedValue(null);
    prisma.fireExtinguisher.create.mockResolvedValue({ id: 'e1', ...baseDto });

    const result = await service.create(baseDto);
    expect(result.id).toBe('e1');
    expect(prisma.fireExtinguisher.create).toHaveBeenCalled();
  });

  it('throws ConflictException for a duplicate serial number', async () => {
    prisma.fireExtinguisher.findUnique.mockResolvedValue({ id: 'dup' });
    await expect(service.create(baseDto)).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('throws BadRequestException when expiryDate is not after installationDate', async () => {
    prisma.fireExtinguisher.findUnique.mockResolvedValue(null);
    await expect(
      service.create({
        ...baseDto,
        installationDate: '2026-01-01',
        expiryDate: '2024-01-01',
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('throws NotFoundException when fetching a missing extinguisher', async () => {
    prisma.fireExtinguisher.findUnique.mockResolvedValue(null);
    await expect(service.findOne('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('returns paginated results with meta', async () => {
    prisma.fireExtinguisher.findMany.mockResolvedValue([{ id: 'e1' }]);
    prisma.fireExtinguisher.count.mockResolvedValue(1);

    const result = await service.findAll({ page: 1, limit: 10 });
    expect(result.data).toHaveLength(1);
    expect(result.meta).toEqual({
      page: 1,
      limit: 10,
      total: 1,
      totalPages: 1,
    });
  });
});
