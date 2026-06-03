import { Controller, Get, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';
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
  getSummary(@CurrentUser() user: AuthUser) {
    const userId = user.role === Role.USER ? user.id : undefined;
    return this.reportsService.getSummary(userId);
  }

  @Get('stock')
  @ApiOperation({ summary: 'Time-bucketed stock counts' })
  getStock(@Query() query: StockQueryDto, @CurrentUser() user: AuthUser) {
    const userId = user.role === Role.USER ? user.id : undefined;
    return this.reportsService.getStock(query.period ?? 'monthly', userId);
  }

  @Get('inspection-status')
  @ApiOperation({ summary: 'Inspection counts grouped by status' })
  getInspectionStatus(@CurrentUser() user: AuthUser) {
    const userId = user.role === Role.USER ? user.id : undefined;
    return this.reportsService.getInspectionStatusCounts(userId);
  }

  @Get('expired')
  @ApiOperation({ summary: 'List expired extinguishers (paginated)' })
  getExpired(
    @Query() query: MaintenanceHistoryQueryDto,
    @CurrentUser() user: AuthUser,
  ) {
    const userId = user.role === Role.USER ? user.id : undefined;
    return this.reportsService.getExpired(query.page, query.limit, userId);
  }

  @Get('maintenance-history')
  @ApiOperation({ summary: 'Maintenance history (paginated)' })
  getMaintenanceHistory(
    @Query() query: MaintenanceHistoryQueryDto,
    @CurrentUser() user: AuthUser,
  ) {
    const userId = user.role === Role.USER ? user.id : undefined;
    return this.reportsService.getMaintenanceHistory(
      query.extinguisherId,
      query.page,
      query.limit,
      userId,
    );
  }

  @Get('export')
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.INSPECTOR, Role.USER)
  @ApiOperation({ summary: 'Export a report as CSV or PDF' })
  export(
    @Query() query: ExportQueryDto,
    @Res() res: Response,
    @CurrentUser() user: AuthUser,
  ) {
    const userId = user.role === Role.USER ? user.id : undefined;
    return this.exportService.export(query.report, query.format, res, userId);
  }
}
