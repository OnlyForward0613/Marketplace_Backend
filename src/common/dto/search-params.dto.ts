// search-params.dto.ts

import { IsOptional, IsString } from 'class-validator';

export class SearchParams {
  @IsOptional()
  @IsString()
  contains?: string;
}
