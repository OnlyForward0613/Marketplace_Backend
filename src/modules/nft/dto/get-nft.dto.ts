// get-nft.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNftDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Token address',
  })
  @IsString()
  @IsNotEmpty()
  tokenAddress: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Token id',
  })
  @IsString()
  @IsNotEmpty()
  tokenId: string;
}
