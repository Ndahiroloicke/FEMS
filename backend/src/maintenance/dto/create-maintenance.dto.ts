import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { MaintenanceCondition } from '../../common/prisma-enums.js';

export class CreateMaintenanceDto {
  @ApiProperty({ example: 'uuid-of-extinguisher' })
  @IsUUID()
  extinguisherId: string;

  @ApiProperty({ example: 'Recharged cylinder and replaced safety pin' })
  @IsString()
  @IsNotEmpty()
  actionsTaken: string;

  @ApiProperty({ example: '2026-06-03T10:00:00.000Z' })
  @IsDateString()
  actionDate: string;

  @ApiProperty({
    enum: MaintenanceCondition,
    example: MaintenanceCondition.GOOD,
  })
  @IsEnum(MaintenanceCondition)
  conditionNoted: MaintenanceCondition;

  @ApiPropertyOptional({ example: 'uuid-of-inspection' })
  @IsOptional()
  @IsUUID()
  inspectionId?: string;
}
