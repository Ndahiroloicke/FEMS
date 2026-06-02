import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ExtinguisherStatus } from '../generated/prisma/client';
import { CreateExtinguisherDto } from './dto/create-extinguisher.dto.js';
import { UpdateExtinguisherDto } from './dto/update-extinguisher.dto.js';
import { ExtinguishersService } from './extinguishers.service.js';

@ApiTags('Fire Extinguishers')
@Controller('extinguishers')
export class ExtinguishersController {
  constructor(private readonly extinguishersService: ExtinguishersService) {}

  @Post()
  @ApiOperation({ summary: 'Register a new fire extinguisher sale' })
  create(@Body() dto: CreateExtinguisherDto) {
    return this.extinguishersService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List fire extinguishers' })
  @ApiQuery({ name: 'status', required: false, enum: ExtinguisherStatus })
  @ApiQuery({ name: 'customerId', required: false })
  @ApiQuery({ name: 'expiringWithinDays', required: false, type: Number })
  findAll(
    @Query('status') status?: ExtinguisherStatus,
    @Query('customerId') customerId?: string,
    @Query('expiringWithinDays') expiringWithinDays?: string,
  ) {
    return this.extinguishersService.findAll({
      status,
      customerId,
      expiringWithinDays: expiringWithinDays
        ? Number(expiringWithinDays)
        : undefined,
    });
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get extinguisher details' })
  findOne(@Param('id') id: string) {
    return this.extinguishersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update extinguisher record' })
  update(@Param('id') id: string, @Body() dto: UpdateExtinguisherDto) {
    return this.extinguishersService.update(id, dto);
  }

  @Post(':id/deliver')
  @ApiOperation({ summary: 'Mark extinguisher as delivered to customer' })
  markDelivered(@Param('id') id: string) {
    return this.extinguishersService.markDelivered(id);
  }

  @Post(':id/return')
  @ApiOperation({ summary: 'Mark extinguisher as returned by customer' })
  markReturned(@Param('id') id: string) {
    return this.extinguishersService.markReturned(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete extinguisher record' })
  remove(@Param('id') id: string) {
    return this.extinguishersService.remove(id);
  }
}
