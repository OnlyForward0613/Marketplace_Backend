// create-like.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLikeDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Nft id',
  })
  @IsString()
  @IsNotEmpty()
  nftId: string;
}
