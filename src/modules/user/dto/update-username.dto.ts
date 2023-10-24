// update-username.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUsernameDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'new username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
}
