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

export enum UserSortByOption {
  ERC721_NFTS = 'ERC721_NFTS',
  ERC1155_NFTS = 'ERC1155_NFTS',
  CREATED = 'CREATED',
  ACTIVITY = 'ACTIVITY',
  FAVORITE = 'FAVORITE',
  HIDDEN = 'HIDDEN',
  LISTING = 'LISTING',
  BUY_OFFER = 'BUY_OFFER',
  SELL_OFFER = 'SELL_OFFER',
}

export class SortParams {
  @IsOptional()
  @IsString()
  sortAscending?: string;

  @IsOptional()
  @IsEnum(CollectionSortByOption)
  sortBy?: CollectionSortByOption;
}
