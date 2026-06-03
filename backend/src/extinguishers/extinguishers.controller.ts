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
import { Roles } from '../common/decorators/roles.decorator.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Role } from '../common/prisma-enums.js';
import { CreateExtinguisherDto } from './dto/create-extinguisher.dto.js';
import { QueryExtinguisherDto } from './dto/query-extinguisher.dto.js';
import { UpdateExtinguisherDto } from './dto/update-extinguisher.dto.js';
import { ExtinguishersService } from './extinguishers.service.js';

@ApiTags('Extinguishers')
@ApiBearerAuth()
@Controller('extinguishers')
@UseGuards(RolesGuard)
export class ExtinguishersController {
  constructor(private readonly extinguishersService: ExtinguishersService) {}

  @Post()
  @Roles(Role.ADMIN, Role.INSPECTOR)
  @ApiOperation({ summary: 'Register a new fire extinguisher' })
  create(@Body() dto: CreateExtinguisherDto) {
    return this.extinguishersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List fire extinguishers (paginated)' })
  findAll(@Query() query: QueryExtinguisherDto) {
    return this.extinguishersService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get extinguisher details' })
  findOne(@Param('id') id: string) {
    return this.extinguishersService.findOne(id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.INSPECTOR)
  @ApiOperation({ summary: 'Update an extinguisher' })
  update(@Param('id') id: string, @Body() dto: UpdateExtinguisherDto) {
    return this.extinguishersService.update(id, dto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Delete an extinguisher (admin)' })
  remove(@Param('id') id: string) {
    return this.extinguishersService.remove(id);
  }
}
