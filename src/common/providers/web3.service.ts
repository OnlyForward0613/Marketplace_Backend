import { NFTCollectionsDto } from '@modules/collection/dto/collection.dto';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Network } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import Web3, { Contract } from 'web3';
import { Web3Account } from 'web3-eth-accounts';
import {
  CANCEL_ABI,
  FULFILLADVANCEDORDER_ABI,
  INKUBATE_ABI,
  LAUNCHPAD_ABI,
} from '@config/abi';
import { INKUBATE_ADDRESS, LAUNCHPAD_ADDRESS } from '@config/address';
import { DeployLaunchpadDto } from '@modules/launchpad/dto/apply-launchpad.dto';
import { ListingDto } from '@modules/listing/dto/listing.dto';
import { OrderParameters } from '@common/types';

@Injectable()
export class Web3Service {
  private logger = new Logger(Web3Service.name);
  private readonly infuraCred: string;
  private readonly web3: Record<Network, Web3>;
  private account: Record<Network, Web3Account>;
  private inkubateContract: Record<Network, Contract<typeof INKUBATE_ABI>>;
  private launchpadContract: Record<Network, Contract<typeof LAUNCHPAD_ABI>>;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.infuraCred = Buffer.from(
      `${this.configService.get(
        'urls.INFURA_API_KEY',
      )}:${this.configService.get('urls.INFURA_SECRET')}`,
    ).toString('base64');

    this.web3 = {
      BNB: new Web3(configService.get('BNB')),
      MAIN: new Web3(
        `${this.configService.get('urls.INFURA_URL')}${this.configService.get(
          'urls.INFURA_API_KEY',
        )}`,
      ),
    };

    this.account = {
      MAIN: this.web3.MAIN.eth.accounts.privateKeyToAccount(
        `0x${this.configService.get('credential.ACCOUNT_PRIVATE_KEY')}`,
      ),
      BNB: this.web3.BNB.eth.accounts.privateKeyToAccount(
        `0x${this.configService.get('credential.ACCOUNT_PRIVATE_KEY')}`,
      ),
    };

    this.inkubateContract = {
      MAIN: new this.web3.MAIN.eth.Contract(INKUBATE_ABI, INKUBATE_ADDRESS),
      BNB: new this.web3.BNB.eth.Contract(INKUBATE_ABI, INKUBATE_ADDRESS),
    };

    this.launchpadContract = {
      MAIN: new this.web3.MAIN.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_ADDRESS),
      BNB: new this.web3.BNB.eth.Contract(LAUNCHPAD_ABI, LAUNCHPAD_ADDRESS),
    };

    this.launchpadContract.MAIN.setProvider(this.web3.MAIN.currentProvider);
  }

  async getBalance(network: Network, address: string): Promise<bigint> {
    return this.web3[network].eth.getBalance(address);
  }

  async getTransaction(network: Network, transactionHash: string) {
    return await this.web3[network].eth.getTransaction(transactionHash);
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

  async deployCollection(
    network: Network,
    data: DeployLaunchpadDto,
  ): Promise<string> {
    const txData = this.launchpadContract[network].methods
      .deployCollection(
        // @ts-ignore
        data.maxSupply,
        data.mintPrice,
        data.startTime,
        data.endTime,
        data.maxMintAmount,
        data.maxWalletAmount,
        data.creator,
        data.name,
        data.symbol,
        data.baseURI,
        data.merkleRoot,
      )
      .encodeABI();
    try {
      const txObj = {
        from: this.account[network].address,
        to: this.launchpadContract.MAIN.options.address,
        data: txData,
      };

      const gas = await this.web3[network].eth.estimateGas(txObj);
      const gasPrice = await this.web3[network].eth.getGasPrice();

      this.logger.log(`gas ${gas}`);
      this.logger.log(`gas ${gasPrice}`);

      const sTx = await this.web3[network].eth.accounts.signTransaction(
        { ...txObj, gas, gasPrice },
        this.account[network].privateKey,
      );

      const rept = await this.web3[network].eth.sendSignedTransaction(
        sTx.rawTransaction,
      );

      this.logger.log(`transaction ${rept.transactionHash} is occurred`);
      const logs = rept.logs;
      if (
        logs &&
        logs.length > 0 &&
        logs[1].topics &&
        logs[1].topics.length === 3 &&
        logs[1].topics[0] ===
          '0x71c40ae53d776f93617b939e8e5909472e3d1d03943957be225fef185711c517'
      ) {
        const collectionAddress =
          '0x' + logs[1].topics[2].toString().substring(26);

        this.logger.log(`new collection address is ${collectionAddress}`);
        return collectionAddress;
      } else return '';
    } catch (e) {
      this.logger.error(e);
    }
  }

  async cancelListing({ network, txHash }: ListingDto) {
    let orderParameters: OrderParameters = {} as OrderParameters;
    const transaction = await this.getTransaction(network, txHash);
    const methodId =
      this.web3[network].eth.abi.encodeFunctionSignature(CANCEL_ABI);
    console.log('methodId', methodId);
    if (!transaction.input || transaction.input.search(methodId) === -1) return;
    try {
      const params = this.web3[network].eth.abi.decodeParameters(
        CANCEL_ABI.inputs,
        transaction.data.split(methodId)[1],
      );
      orderParameters = params['orders']['0'];
      console.log(orderParameters);
      return { orderParameters, error: '' };
    } catch (e) {
      this.logger.error(e);
      return { orderParameters, error: e };
    }
  }

  async buyListing({ network, txHash }: ListingDto) {
    let orderParameters: OrderParameters = {} as OrderParameters;
    const transaction = await this.getTransaction(network, txHash);
    const methodId = this.web3[network].eth.abi.encodeFunctionSignature(
      FULFILLADVANCEDORDER_ABI,
    );
    if (!transaction.input || transaction.input.search(methodId) === -1)
      return { orderParameters, error: 'Invalid transaction hash' };
    try {
      const params = this.web3[network].eth.abi.decodeParameters(
        FULFILLADVANCEDORDER_ABI.inputs,
        transaction.data.split(methodId)[1],
      );
      orderParameters = params['0']['parameters'];
      return { orderParameters, error: '' };
    } catch (e) {
      this.logger.error(e);
      return { orderParameters, error: e };
    }
  }
}
