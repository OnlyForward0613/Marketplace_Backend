// read-notification.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
export class UpdateNotificationsDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Notification ids',
  })
  @IsArray()
  @IsNotEmpty()
  ids: string[];
}
