// cancel-offer.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
export class CancelOfferDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Offer id',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Network',
  })
  @IsEnum(Network)
  @IsNotEmpty()
  network: Network;
}
