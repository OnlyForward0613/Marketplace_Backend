// collection.dto.ts

import { IsNotEmpty } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  creatorId: string;
}

export class CreateAttributeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  options: string[];
}

export class NFTCollectionsDto {
  @IsNotEmpty()
  walletAddress: string;

  @IsNotEmpty()
  chainId: string;
}
