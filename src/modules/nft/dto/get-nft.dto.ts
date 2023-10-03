// get-nft.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNftDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Nft id of contract',
  })
  @IsString()
  @IsNotEmpty()
  nftId: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Nft address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
