import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  ExtinguisherStatus,
  ExtinguisherType,
} from '../../common/prisma-enums.js';

export const EXTINGUISHER_SIZES = ['2.5lbs', '5lbs', '9lbs', '12lbs'] as const;
export type ExtinguisherSize = (typeof EXTINGUISHER_SIZES)[number];

export class CreateExtinguisherDto {
  @ApiProperty({ example: 'FE-2024-001234' })
  @IsString()
  @IsNotEmpty({ message: 'Serial number is required' })
  @MinLength(3, { message: 'Serial number must be at least 3 characters' })
  serialNumber: string;

  @ApiProperty({ example: 'Building A — Floor 2 Corridor' })
  @IsString()
  @IsNotEmpty({ message: 'Location is required' })
  @MinLength(3, { message: 'Location must be at least 3 characters' })
  location: string;

  @ApiProperty({ enum: ExtinguisherType, example: ExtinguisherType.CO2 })
  @IsEnum(ExtinguisherType)
  type: ExtinguisherType;

  @ApiProperty({ enum: EXTINGUISHER_SIZES, example: '5lbs' })
  @IsIn(EXTINGUISHER_SIZES as readonly string[])
  size: ExtinguisherSize;

  @ApiProperty({ example: '2024-01-15' })
  @IsDateString()
  installationDate: string;

  @ApiProperty({ example: '2025-01-15' })
  @IsDateString()
  expiryDate: string;

  @ApiPropertyOptional({
    enum: ExtinguisherStatus,
    default: ExtinguisherStatus.ACTIVE,
  })
  @IsOptional()
  @IsEnum(ExtinguisherStatus)
  status?: ExtinguisherStatus;
}
