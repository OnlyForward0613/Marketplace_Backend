// signup.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Wallet address',
  })
  @IsString()
  @IsNotEmpty()
  walletAddress: string;
}
