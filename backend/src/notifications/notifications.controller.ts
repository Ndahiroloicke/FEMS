import { Controller, Get, Param, Patch, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import { PaginationDto } from '../common/dto/pagination.dto.js';
import { NotificationsService } from './notifications.service.js';
import { IsBooleanString, IsOptional } from 'class-validator';

class ListNotificationsDto extends PaginationDto {
  @IsOptional()
  @IsBooleanString()
  isRead?: string;
}

@ApiTags('Notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  @ApiOperation({ summary: 'List the current user notifications (paginated)' })
  @ApiQuery({ name: 'isRead', required: false, type: Boolean })
  findAll(
    @CurrentUser('id') userId: string,
    @Query() query: ListNotificationsDto,
  ) {
    const isRead =
      query.isRead === undefined ? undefined : query.isRead === 'true';
    return this.notificationsService.findForUser(
      userId,
      query.page,
      query.limit,
      isRead,
    );
  }

  @Patch('read-all')
  @ApiOperation({ summary: 'Mark all notifications as read' })
  markAllRead(@CurrentUser('id') userId: string) {
    return this.notificationsService.markAllRead(userId);
  }

  @Patch(':id/read')
  @ApiOperation({ summary: 'Mark a notification as read' })
  markRead(@Param('id') id: string, @CurrentUser('id') userId: string) {
    return this.notificationsService.markRead(id, userId);
  }
}
