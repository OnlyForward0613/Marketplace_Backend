// signin.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Wallet address',
  })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Sign signature',
  })
  @IsString()
  @IsNotEmpty()
  signature: string;
}
