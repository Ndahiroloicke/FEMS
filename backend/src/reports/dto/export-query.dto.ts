import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsUUID } from 'class-validator';
import { PaginationDto } from '../../common/dto/pagination.dto.js';

export class StockQueryDto {
  @ApiPropertyOptional({
    enum: ['daily', 'monthly', 'yearly'],
    default: 'monthly',
  })
  @IsOptional()
  @IsIn(['daily', 'monthly', 'yearly'])
  period?: 'daily' | 'monthly' | 'yearly' = 'monthly';
}

export class MaintenanceHistoryQueryDto extends PaginationDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  extinguisherId?: string;
}

export class ExportQueryDto {
  @ApiProperty({
    enum: ['extinguishers', 'inspections', 'maintenance', 'expired'],
  })
  @IsIn(['extinguishers', 'inspections', 'maintenance', 'expired'])
  report: 'extinguishers' | 'inspections' | 'maintenance' | 'expired';

  @ApiProperty({ enum: ['csv', 'pdf'] })
  @IsIn(['csv', 'pdf'])
  format: 'csv' | 'pdf';
}
