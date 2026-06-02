import { ApiPropertyOptional } from '@nestjs/swagger';
import { EscalationStatus } from '../../generated/prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateEscalationDto {
  @ApiPropertyOptional({ enum: EscalationStatus })
  @IsOptional()
  @IsEnum(EscalationStatus)
  status?: EscalationStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  notes?: string;
}
