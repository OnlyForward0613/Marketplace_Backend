// create-collection.controller.ts

import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCollectionDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Collection name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Collection address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Total supply',
  })
  @IsNumber()
  @IsNotEmpty()
  supply: number;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Avatar id',
  })
  @IsString()
  @IsOptional()
  avatarId?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Banner id',
  })
  @IsString()
  @IsOptional()
  bannerId?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Collection description',
  })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Website url',
  })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Twitter url',
  })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Discord url',
  })
  @IsString()
  @IsOptional()
  discord?: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Network',
  })
  @IsString()
  @IsNotEmpty()
  network: Network;
}
