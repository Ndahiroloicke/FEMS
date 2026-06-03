import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateInspectionDto {
  @ApiProperty({ example: 'uuid-of-extinguisher' })
  @IsUUID('4', { message: 'extinguisherId must be a valid UUID' })
  extinguisherId: string;

  @ApiProperty({ example: '2026-07-01T09:00:00.000Z' })
  @IsDateString({}, { message: 'scheduledAt must be a valid ISO date' })
  scheduledAt: string;

  @ApiPropertyOptional({ example: 'uuid-of-inspector' })
  @IsOptional()
  @IsUUID('4', { message: 'inspectorId must be a valid UUID' })
  inspectorId?: string;

  @ApiPropertyOptional({ example: 'Extinguisher in Hall B looks damaged' })
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Notes cannot be blank if provided' })
  @MinLength(5, { message: 'Notes must be at least 5 characters if provided' })
  notes?: string;
}
