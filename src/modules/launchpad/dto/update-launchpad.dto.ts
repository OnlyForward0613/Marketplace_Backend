// create-launchpad.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class UpdateLaunchpadDto {
  @ApiProperty({
    required: true,
    description: 'Mint price',
  })
  @IsString()
  @IsNotEmpty()
  mintPrice: bigint;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Supply of collection',
  })
  @IsNumber()
  @IsNotEmpty()
  supply: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Collection uri of metadata',
  })
  @IsString()
  @IsNotEmpty()
  collectionUri: string;

  @ApiProperty({
    required: true,
    description: 'Owners of launchpad',
  })
  @IsArray()
  @IsNotEmpty()
  owners: string[];

  @ApiProperty({
    required: true,
    description: 'Owner Royalties of launchpad',
  })
  @IsArray()
  @IsNotEmpty()
  ownerRoyalties: number[];

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Max per transaction',
  })
  @IsNumber()
  @IsNotEmpty()
  maxPerTx: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Max per wallet',
  })
  @IsNumber()
  @IsNotEmpty()
  maxPerWallet: number;

  @ApiProperty({
    required: true,
    type: 'boolean',
    description: 'Is WL enabled',
  })
  @IsBoolean()
  @IsNotEmpty()
  wlEnabled: boolean;

  @ApiProperty({
    required: true,
    description: 'WL addresses of the launchpad',
  })
  @IsArray()
  @IsNotEmpty()
  wlAddresses: string[];

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Start date',
  })
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'End date',
  })
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'token uri prefix',
  })
  @IsString()
  @IsOptional()
  prefix: string;
}
