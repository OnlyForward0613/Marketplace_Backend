import { IsNumber, IsString } from 'class-validator';
export class CreateListingDto {
  @IsString()
  nftId!: string;
  @IsNumber()
  price!: number;
}
