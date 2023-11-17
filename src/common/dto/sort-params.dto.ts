// sort-params.dto.ts

import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum CollectionSortByOption {
  PRICE = 'PRICE',
  LISTING_DATE = 'LISTING_DATE',
  BEST_OFFER = 'BEST_OFFER',
  LAST_SALE_PRICE = 'LAST_SALE_PRICE',
  LAST_SALE_DATE = 'LAST_SALE_DATE',
  CREATED_DATE = 'CREATED_DATE',
  FAVORITE_COUNT = 'FAVORITE_COUNT',
  EXPIRATION_DATE = 'EXPIRATION_DATE',
}

export enum StatsSortByOption {
  VOLUME = 'VOLUME',
  LIQUIDITY = 'LIQUIDITY',
  FLOOR = 'FLOOR',
  SALES = 'SALES',
  ITEMS = 'ITEMS',
  LISTED = 'LISTED',
  OWNERS = 'OWNERS',
}

export class SortParams {
  @IsOptional()
  @IsString()
  sortAscending?: string;

  @IsOptional()
  @IsEnum([
    ...Object.values(CollectionSortByOption),
    ...Object.values(StatsSortByOption),
  ])
  sortBy?: CollectionSortByOption | StatsSortByOption;
}
