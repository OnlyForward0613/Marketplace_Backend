// create-launchpad.dto.ts

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
import { UpdateLaunchpadDto } from './update-launchpad.dto';

export class CreateLaunchpadDto extends UpdateLaunchpadDto {
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
    required: true,
    type: 'boolean',
    description: 'Is reserve tokens enable?',
  })
  @IsBoolean()
  @IsNotEmpty()
  enableReserveTokens: boolean;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'network',
  })
  @IsString()
  @IsNotEmpty()
  network: Network;

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
    required: false,
    type: 'string',
    description: 'Facebook url',
  })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Reddit url',
  })
  @IsString()
  @IsOptional()
  reddit?: string;
}
