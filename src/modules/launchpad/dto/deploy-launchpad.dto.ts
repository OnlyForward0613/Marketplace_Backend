import { IsNotEmpty } from 'class-validator';

export class DeployLaunchpadDto {
  @IsNotEmpty()
  maxSupply: number;

  @IsNotEmpty()
  mintPrice: bigint;

  @IsNotEmpty()
  startTime: number;

  @IsNotEmpty()
  endTime: number;

  @IsNotEmpty()
  maxMintAmount: number;

  @IsNotEmpty()
  maxWalletAmount: number;

  @IsNotEmpty()
  creator: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  symbol: string;

  @IsNotEmpty()
  baseURI: string;

  @IsNotEmpty()
  merkleRoot: string;
}
