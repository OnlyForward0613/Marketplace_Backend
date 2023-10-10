import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class AcceptOfferDto {
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
    description: 'Transaction hash',
  })
  @IsString()
  @IsNotEmpty()
  txHash: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Network',
  })
  @IsEnum(Network)
  @IsNotEmpty()
  network: Network;
}
