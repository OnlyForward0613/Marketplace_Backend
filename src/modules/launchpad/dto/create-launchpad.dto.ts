import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

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
    description: 'Launchpad category',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Image url',
  })
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Cover url',
  })
  @IsString()
  @IsOptional()
  coverUrl?: string;

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
    type: 'number',
    description: 'Launch date',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  launchDate: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Mint price',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  mintPrice: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Twitter url',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  twitter: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Discord url',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  discord: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Website url',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  website: string;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Supply of nfts',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  supply: number;

  @ApiProperty({
    required: true,
    type: 'number',
    description: 'Royalty',
  })
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  royalty: number;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Collection address',
  })
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  collectionAddress: string;
}
