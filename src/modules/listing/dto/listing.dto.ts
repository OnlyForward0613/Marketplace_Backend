import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { IsString, IsEnum, IsNotEmpty } from 'class-validator';
export class ListingDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Listing id',
  })
  @IsString()
  @IsNotEmpty()
  id: string;

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
    description: 'Transaction Hash',
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
