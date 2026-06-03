import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsUUID } from 'class-validator';
import { InspectionStatus } from '../../common/prisma-enums.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';

export class QueryInspectionDto extends PaginationDto {
  @ApiPropertyOptional({ enum: InspectionStatus })
  @IsOptional()
  @IsEnum(InspectionStatus)
  status?: InspectionStatus;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  extinguisherId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  inspectorId?: string;
}
