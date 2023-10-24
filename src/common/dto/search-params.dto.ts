// search-params.dto.ts

import { IsEnum, IsOptional } from 'class-validator';

export enum SortByOption {
  LISTING_DATE = 'LISTING_DATE',
  BEST_OFFER = 'BEST_OFFER',
  LAST_SALE_PRICE = 'LAST_SALE_PRICE',
  LAST_SALE_DATE = 'LAST_SALE_DATE',
  CREATED_DATE = 'CREATED_DATE',
  VIEWER_COUNT = 'VIEWER_COUNT',
  FAVORITE_COUNT = 'FAVORITE_COUNT',
  EXPIRATION_DATE = 'EXPIRATION_DATE',
}

export class SearchParams {
  @IsOptional()
  sortAscending?: Boolean;

  @IsOptional()
  @IsEnum(SortByOption)
  sortBy?: SortByOption;
}
