import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { EscalationStatus } from '../generated/prisma/client';
import { UpdateEscalationDto } from './dto/update-escalation.dto.js';
import { EscalationsService } from './escalations.service.js';

@ApiTags('Escalations')
@Controller('escalations')
export class EscalationsController {
  constructor(private readonly escalationsService: EscalationsService) {}

  @Get()
  @ApiOperation({ summary: 'List police escalation cases' })
  @ApiQuery({ name: 'status', required: false, enum: EscalationStatus })
  findAll(@Query('status') status?: EscalationStatus) {
    return this.escalationsService.findAll(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get escalation details' })
  findOne(@Param('id') id: string) {
    return this.escalationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update escalation status or notes' })
  update(@Param('id') id: string, @Body() dto: UpdateEscalationDto) {
    return this.escalationsService.update(id, dto);
  }

  @Post(':id/report-to-police')
  @ApiOperation({ summary: 'Mark escalation as reported to police' })
  markReported(@Param('id') id: string, @Body('notes') notes?: string) {
    return this.escalationsService.markReportedToPolice(id, notes);
  }
}
