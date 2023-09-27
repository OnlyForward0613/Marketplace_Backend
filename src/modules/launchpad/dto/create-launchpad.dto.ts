import { ApiProperty } from '@nestjs/swagger';
import { Network } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsOptional,
  IsArray,
  IsBoolean,
} from 'class-validator';

export class CreateLaunchpadDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Launchpad name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Launchpad symbol',
  })
  @IsString()
  @IsNotEmpty()
  symbol: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Launchpad description',
  })
  @IsString()
  @IsOptional()
  desc?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Logo id',
  })
  @IsString()
  @IsOptional()
  logoId?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Image id',
  })
  @IsString()
  @IsOptional()
  imageId?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Logo url',
  })
  @IsString()
  @IsOptional()
  logoUrl?: string;

  @ApiProperty({
    required: true,
    type: 'bigint',
    description: 'Mint price',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mintPrice: bigint;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Supply of collection',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supply: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Collection metadata resource uri',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  collectionUri: string;

  @ApiProperty({
    required: true,
    type: 'string[]',
    description: 'Owners of launchpad',
  })
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  owners: string[];

  @ApiProperty({
    required: true,
    type: 'number[]',
    description: 'Owner Royalties of launchpad',
  })
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  ownerRoyalties: number[];

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Max per transaction',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  maxPerTx: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Max per wallet',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  maxPerWallet: number;

  @ApiProperty({
    required: true,
    type: 'boolean',
    description: 'Is WL enabled',
  })
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  wlEnabled: boolean;

  @ApiProperty({
    required: true,
    type: 'string[]',
    description: 'WL addresses of the launchpad',
  })
  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  wlAddresses: string[];

  @ApiProperty({
    required: true,
    type: 'boolean',
    description: 'Is reserve tokens enable?',
  })
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  enableReserveTokens: boolean;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Start date',
  })
  @ApiProperty()
  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'End date',
  })
  @ApiProperty()
  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({
    required: true,
    type: 'Network(MAIN | BNB)',
    description: 'network',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  network: Network;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Twitter url',
  })
  @ApiProperty()
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Discord url',
  })
  @ApiProperty()
  @IsString()
  @IsOptional()
  discord?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Facebook url',
  })
  @ApiProperty()
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Reddit url',
  })
  @ApiProperty()
  @IsString()
  @IsOptional()
  reddit?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Collection Id',
  })
  @ApiProperty()
  @IsString()
  @IsOptional()
  collectionId?: string;
}
