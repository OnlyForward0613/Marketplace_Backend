// nft.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { ContractType } from '@prisma/client';
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
    description: 'Nft name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

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

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Asset url',
  })
  @IsString()
  @IsNotEmpty()
  assetUrl: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Image url',
  })
  @IsString()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Royalty permyriad of nft',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  royalty: number;

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
    description: 'Nft metadata attributes JSON',
  })
  @ApiProperty()
  @IsNotEmpty()
  attributes: object;
}
