// notification.controller.ts

import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { NotificationService } from '../services/notification.service';
import { UpdateNotificationsDto } from '../dto/read-notification.dto';

const moduleName = 'notification';

@ApiTags(moduleName)
@Controller(moduleName)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiOperation({
    summary: 'Get notifications by user',
    description: 'forbidden',
  })
  @UseGuards(AccessTokenGuard)
  @Get('user')
  async getUserNotifications(@CurrentUser() user: User) {
    return await this.notificationService.getNotificationsByUser(user.id);
  }

  @ApiOperation({ summary: 'Read notification', description: 'forbidden' })
  @ApiBody({
    type: UpdateNotificationsDto,
  })
  @UseGuards(AccessTokenGuard)
  @Post()
  async markAsReadNotification(
    @CurrentUser() actor: User,
    @Body() data: UpdateNotificationsDto,
  ) {
    return this.notificationService.readNotification(actor.id, data);
  }
}
