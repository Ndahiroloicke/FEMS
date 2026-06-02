import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotificationsService } from './notifications.service.js';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List sent notifications' })
  @ApiQuery({ name: 'customerId', required: false })
  findAll(@Query('customerId') customerId?: string) {
    return this.notificationsService.findAll(customerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get notification details' })
  findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }
}
