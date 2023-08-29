import { IsNumber, IsString } from 'class-validator';
export class CreateOrderDto {
  @IsString()
  buyerId!: string;
  @IsString()
  listingId!: string;
  @IsString()
  nftId!: string;
  @IsNumber()
  amount!: number;
}
