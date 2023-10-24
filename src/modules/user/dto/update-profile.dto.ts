// update-profile.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AvatarDto {
  @IsString()
  url!: string;

  @IsString()
  mintId!: string;

  @IsString()
  link!: string;

  @IsString()
  verified!: boolean;
}

export class UpdateProfileDto {
  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Bio of the user',
  })
  @IsString()
  @IsOptional()
  bio?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Avatar image id',
  })
  @IsString()
  @IsOptional()
  avatarId?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Banner image id',
  })
  @IsString()
  @IsOptional()
  bannerId?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Twitter link',
  })
  @IsString()
  @IsOptional()
  twitter?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Discord link',
  })
  @IsString()
  @IsOptional()
  discord?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Facebook link',
  })
  @IsString()
  @IsOptional()
  facebook?: string;

  @ApiProperty({
    required: false,
    type: 'string',
    description: 'Reddit link',
  })
  @IsString()
  @IsOptional()
  reddit?: string;
}
