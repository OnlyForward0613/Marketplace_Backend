// nft.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { ContractType, Network } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNftDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Collection id of nft',
  })
  @IsString()
  @IsNotEmpty()
  collectionId: string;

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
    description: 'Contract type',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  contractType: ContractType;

  @ApiProperty({
    required: true,
    description: 'Mint price',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  price: bigint;

  @ApiProperty({
    required: true,
    description: 'Network',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  network: Network;

  @ApiProperty({
    required: true,
    description: 'Transaction Hash',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  txHash: string;
}
