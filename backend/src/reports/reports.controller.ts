import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/prisma-enums.js';
import {
  ExportQueryDto,
  MaintenanceHistoryQueryDto,
  StockQueryDto,
} from './dto/export-query.dto.js';
import { ExportService } from './export.service.js';
import { ReportsService } from './reports.service.js';

@ApiTags('Reports')
@ApiBearerAuth()
@Controller('reports')
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly exportService: ExportService,
  ) {}

  @Get('summary')
  @ApiOperation({ summary: 'Aggregate dashboard summary' })
  getSummary() {
    return this.reportsService.getSummary();
  }

  @Get('stock')
  @ApiOperation({ summary: 'Time-bucketed stock counts' })
  getStock(@Query() query: StockQueryDto) {
    return this.reportsService.getStock(query.period ?? 'monthly');
  }

  @Get('inspection-status')
  @ApiOperation({ summary: 'Inspection counts grouped by status' })
  getInspectionStatus() {
    return this.reportsService.getInspectionStatusCounts();
  }

  @Get('expired')
  @ApiOperation({ summary: 'List expired extinguishers (paginated)' })
  getExpired(@Query() query: MaintenanceHistoryQueryDto) {
    return this.reportsService.getExpired(query.page, query.limit);
  }

  @Get('maintenance-history')
  @ApiOperation({ summary: 'Maintenance history (paginated)' })
  getMaintenanceHistory(@Query() query: MaintenanceHistoryQueryDto) {
    return this.reportsService.getMaintenanceHistory(
      query.extinguisherId,
      query.page,
      query.limit,
    );
  }

  @Get('export')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.INSPECTOR)
  @ApiOperation({ summary: 'Export a report as CSV or PDF (ADMIN/INSPECTOR only)' })
  export(@Query() query: ExportQueryDto, @Res() res: Response) {
    return this.exportService.export(query.report, query.format, res);
  }
}
