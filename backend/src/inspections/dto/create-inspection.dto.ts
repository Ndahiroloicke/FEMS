import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateInspectionDto {
  @ApiProperty({ example: 'uuid-of-extinguisher' })
  @IsUUID()
  extinguisherId: string;

  @ApiProperty({ example: '2026-07-01T09:00:00.000Z' })
  @IsDateString()
  scheduledAt: string;

  @ApiPropertyOptional({ example: 'uuid-of-inspector' })
  @IsOptional()
  @IsUUID()
  inspectorId?: string;

  @ApiPropertyOptional({ example: 'Annual pressure check' })
  @IsOptional()
  @IsString()
  notes?: string;
}
