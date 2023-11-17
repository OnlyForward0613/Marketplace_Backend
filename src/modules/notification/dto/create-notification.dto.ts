// create-notification.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { NotificationType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateNotificationDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Activity id',
  })
  @IsString()
  @IsNotEmpty()
  activityId: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Notification type',
  })
  @IsEnum(NotificationType)
  @IsNotEmpty()
  type: NotificationType;
}
