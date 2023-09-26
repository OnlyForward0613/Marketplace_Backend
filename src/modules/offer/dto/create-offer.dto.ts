import { IsNumber, IsString } from 'class-validator';
export class CreateOfferDto {
  @IsString()
  buyerId?: string;

  @IsString()
  listingId: string;

  @IsString()
  nftId: string;

  @IsNumber()
  offerPrice: number;
}
