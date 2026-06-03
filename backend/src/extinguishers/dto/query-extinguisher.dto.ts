import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import {
  ExtinguisherStatus,
  ExtinguisherType,
} from '../../common/prisma-enums.js';
import { PaginationDto } from '../../common/dto/pagination.dto.js';

export class QueryExtinguisherDto extends PaginationDto {
  @ApiPropertyOptional({ enum: ExtinguisherStatus })
  @IsOptional()
  @IsEnum(ExtinguisherStatus)
  status?: ExtinguisherStatus;

  @ApiPropertyOptional({ enum: ExtinguisherType })
  @IsOptional()
  @IsEnum(ExtinguisherType)
  type?: ExtinguisherType;

  @ApiPropertyOptional({ description: 'Search by serial number or location' })
  @IsOptional()
  @IsString()
  search?: string;
}
