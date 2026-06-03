import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/prisma-enums.js';
import { CreateInspectionDto } from './dto/create-inspection.dto.js';
import { QueryInspectionDto } from './dto/query-inspection.dto.js';
import { UpdateInspectionDto } from './dto/update-inspection.dto.js';
import { InspectionsService } from './inspections.service.js';

@ApiTags('Inspections')
@ApiBearerAuth()
@Controller('inspections')
@UseGuards(RolesGuard)
export class InspectionsController {
  constructor(private readonly inspectionsService: InspectionsService) {}

  @Post()
  @ApiOperation({ summary: 'Schedule an inspection' })
  create(@Body() dto: CreateInspectionDto, @CurrentUser('id') userId: string) {
    return this.inspectionsService.create(dto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'List inspections (paginated)' })
  findAll(@Query() query: QueryInspectionDto) {
    return this.inspectionsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get inspection details' })
  findOne(@Param('id') id: string) {
    return this.inspectionsService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.INSPECTOR)
  @ApiOperation({ summary: 'Update an inspection' })
  update(@Param('id') id: string, @Body() dto: UpdateInspectionDto) {
    return this.inspectionsService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an inspection (admin)' })
  remove(@Param('id') id: string) {
    return this.inspectionsService.remove(id);
  }
}
