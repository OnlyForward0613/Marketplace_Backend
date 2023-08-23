
import { IsString } from 'class-validator';

export class UserSignInDto {
  @IsString()
  walletAddress: string;
}
