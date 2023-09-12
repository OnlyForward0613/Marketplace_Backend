import { Auth, SDK } from '@infura/sdk';
import { NFTCollectionsDto } from '@modules/collection/dto/collection.dto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfuraService {
  private readonly infuraCred: string;

  constructor(private readonly configService: ConfigService) {
    this.infuraCred = Buffer.from(
      `${this.configService.get(
        'urls.infura_api_key',
      )}:${this.configService.get('urls.infura_secret')}`,
    ).toString('base64');
  }
  private createInfuraAuth(chainId: string | number) {
    return new Auth({
      chainId: Number(chainId),
      projectId: this.configService.get('urls.infura_api_key'),
      secretId: this.configService.get('urls.infura_secret'),
    });
  }
  private getInfuraSDK(chainId: string | number) {
    const _auth = this.createInfuraAuth(chainId);
    return new SDK(_auth);
  }
  async getCollectionsByWallet({ chainId, walletAddress }: NFTCollectionsDto) {
    const sdk = this.getInfuraSDK(chainId);

    return await sdk.api.getCollectionsByWallet({
      walletAddress,
    });
  }
  async getNFTs({ chainId, walletAddress }: NFTCollectionsDto) {
    const sdk = this.getInfuraSDK(chainId);
    return await sdk.api.getNFTs({
      publicAddress: walletAddress,
    });
  }
  async getNFTsForCollection(
    contractAddress: string,
    chainId: number | string,
  ) {
    const sdk = this.getInfuraSDK(chainId);
    return await sdk.api.getNFTsForCollection({
      contractAddress,
    });
  }
}
