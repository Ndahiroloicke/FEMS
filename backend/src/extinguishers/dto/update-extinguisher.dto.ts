import { ApiPropertyOptional } from '@nestjs/swagger';
import { ExtinguisherStatus } from '../../generated/prisma/client';
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateExtinguisherDto {
  @ApiPropertyOptional({ example: 'ABC Dry Powder' })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ example: '6kg' })
  @IsOptional()
  @IsString()
  capacity?: string;

  @ApiPropertyOptional({ example: '2025-01-15' })
  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @ApiPropertyOptional({ enum: ExtinguisherStatus })
  @IsOptional()
  @IsEnum(ExtinguisherStatus)
  status?: ExtinguisherStatus;
}
