import { Network } from '@prisma/client';
import { IsNumber, IsString, IsEnum } from 'class-validator';
export class CreateListingDto {
  @IsString()
  nftId!: string;
  @IsNumber()
  price!: number;
  @IsEnum(Network)
  network: Network;
}
