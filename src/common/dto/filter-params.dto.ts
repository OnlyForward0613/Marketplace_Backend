// filter-params.dto.ts

import { PeriodType } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

export enum UserFilterByOption {
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

export class FilterParams {
  @IsOptional()
  @IsEnum(PeriodType)
  period?: PeriodType;

  @IsOptional()
  @IsEnum(UserFilterByOption)
  filterBy?: UserFilterByOption;
}
