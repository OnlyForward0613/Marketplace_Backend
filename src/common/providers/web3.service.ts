import { NFTCollectionsDto } from '@modules/collection/dto/collection.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Network } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import Web3 from 'web3';

@Injectable()
export class Web3Service {
  private readonly web3: Record<Network, Web3>;
  private readonly infuraCred: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    console.log(this.configService.get('urls.infura_api_key'));
    this.infuraCred = Buffer.from(
      `${this.configService.get(
        'urls.infura_api_key',
      )}:${this.configService.get('urls.infura_secret')}`,
    ).toString('base64');
    this.web3 = {
      BNB: new Web3(configService.get('BNB')),
      MAIN: new Web3(configService.get('INFURA_URL')),
    };
    console.log(configService.get('INFURA_URL'));
  }

  async getBalance(network: Network, address: string): Promise<bigint> {
    return this.web3[network].eth.getBalance(address);
  }
  async getERC721Contracts() {
    try {
      // Fetch the list of ERC-721 contracts
      const infura_api_key = this.configService.get('infura_api_key');
      const response = await firstValueFrom(
        this.httpService.get(
          `https://api.etherscan.io/api?module=contract&action=getcontractcount&apikey=${infura_api_key}`,
        ),
      );
      const contractCount = response.data.result;

      const contracts = [];
      const batchSize = 50;

      for (let i = 1; i <= contractCount; i += batchSize) {
        const startBlock = i;
        const endBlock = Math.min(i + batchSize - 1, contractCount);

        const contractResponse = await firstValueFrom(
          this.httpService.get(
            `https://api.etherscan.io/api?module=contract&action=getcontractlist&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${infura_api_key}`,
          ),
        );
        contracts.push(...contractResponse.data.result);
      }

      return contracts;
    } catch (error) {
      console.error('Error:', error.message || error);
    }
  }

  async getNFTSbyAddress({ walletAddress, chainId }: NFTCollectionsDto) {
    // const chainId = 1;
    // const walletAddress = '0xb2df181E57fDe55CF35882610b84413678FD9840';
    const res = await firstValueFrom(
      this.httpService.get(
        `https://nft.api.infura.io/networks/${chainId}/accounts/${walletAddress}/assets/nfts`,
        {
          headers: {
            Authorization: `Basic ${this.infuraCred}`,
          },
        },
      ),
    );
    return res.data;
  }
}
