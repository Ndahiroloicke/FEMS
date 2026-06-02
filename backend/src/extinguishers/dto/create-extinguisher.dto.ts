import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ExtinguisherStatus } from '../../generated/prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateExtinguisherDto {
  @ApiProperty({ example: 'FE-2024-001234' })
  @IsString()
  @IsNotEmpty()
  serialNumber: string;

  @ApiProperty({ example: 'uuid-of-customer' })
  @IsUUID()
  customerId: string;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  purchaseDate: string;

  @ApiProperty({ example: '2025-01-15' })
  @IsDateString()
  expiryDate: string;

  @ApiPropertyOptional({ example: 'ABC Dry Powder' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: '6kg' })
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiPropertyOptional({ enum: ExtinguisherStatus, default: ExtinguisherStatus.ACTIVE })
  @IsOptional()
  @IsEnum(ExtinguisherStatus)
  status?: ExtinguisherStatus;
}
