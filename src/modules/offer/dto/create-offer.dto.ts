import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateOfferDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Listing id',
  })
  @IsString()
  @IsNotEmpty()
  listingId: string;

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
