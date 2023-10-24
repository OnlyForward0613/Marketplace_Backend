// create-activity.dto.ts

import { IsNumber, IsString } from 'class-validator';
export class CreateActivityDto {
  @IsString()
  buyerId?: string;

  @IsString()
  listingId: string;

  @IsString()
  nftId: string;

  @IsNumber()
  activityPrice: number;
}
