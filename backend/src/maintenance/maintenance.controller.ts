import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/prisma-enums.js';
import { CreateMaintenanceDto } from './dto/create-maintenance.dto.js';
import { QueryMaintenanceDto } from './dto/query-maintenance.dto.js';
import { MaintenanceService } from './maintenance.service.js';

@ApiTags('Maintenance')
@ApiBearerAuth()
@Controller('maintenance')
@UseGuards(RolesGuard)
export class MaintenanceController {
  constructor(private readonly maintenanceService: MaintenanceService) {}

  @Post()
  @Roles(Role.ADMIN, Role.INSPECTOR)
  @ApiOperation({ summary: 'Log a maintenance action' })
  create(@Body() dto: CreateMaintenanceDto, @CurrentUser('id') userId: string) {
    return this.maintenanceService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List maintenance logs (paginated)' })
  findAll(@Query() query: QueryMaintenanceDto) {
    return this.maintenanceService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a maintenance log' })
  findOne(@Param('id') id: string) {
    return this.maintenanceService.findOne(id);
  }
}
