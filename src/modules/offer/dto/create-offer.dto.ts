// create-offer.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CreateOfferDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Nft id',
  })
  @IsString()
  @IsNotEmpty()
  nftId: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Signature',
  })
  @IsString()
  @IsNotEmpty()
  signature: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Parameters',
  })
  @IsString()
  @IsNotEmpty()
  parameters: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Network',
  })
  @IsEnum(Network)
  @IsNotEmpty()
  network: Network;
}
