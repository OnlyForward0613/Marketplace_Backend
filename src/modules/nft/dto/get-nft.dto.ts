// get-nft.dto.ts

import { FilterParams } from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { SearchParams } from '@common/dto/search-params.dto';
import { SortParams } from '@common/dto/sort-params.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetNftDto {
  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Token address',
  })
  @IsString()
  @IsNotEmpty()
  tokenAddress: string;

  @ApiProperty({
    required: true,
    type: 'string',
    description: 'Token id',
  })
  @IsString()
  @IsNotEmpty()
  tokenId: string;
}

export class PaginationDto {
  @ApiProperty({
    required: true,
    type: 'object',
    description: 'Sort Params',
  })
  @IsNotEmpty()
  sort: SortParams;

  @ApiProperty({
    required: true,
    type: 'object',
    description: 'Search Params',
  })
  @IsNotEmpty()
  search: SearchParams;

  @ApiProperty({
    required: true,
    type: 'object',
    description: 'Pagination Params',
  })
  @IsNotEmpty()
  pagination: PaginationParams;

  @ApiProperty({
    required: true,
    type: 'object',
    description: 'Filter Params',
  })
  @IsNotEmpty()
  filter: FilterParams;
}
