import { networks } from '@common/constants';
import { Injectable } from '@nestjs/common';

import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { Network } from '@prisma/client';
import { ethers } from 'ethers';
import { parseEther } from 'ethers/lib/utils';

@Injectable()
export class SeaportService {
  private _seaports: Record<Network, Seaport>;
  private _providers: Record<Network, ethers.providers.JsonRpcProvider>;

  constructor() {
    this._providers = {
      BNB: new ethers.providers.JsonRpcProvider(networks[Network.BNB].url),
      MAIN: new ethers.providers.JsonRpcProvider(networks[Network.MAIN].url),
    };
    this._seaports = {
      BNB: new Seaport(this._providers.BNB),
      MAIN: new Seaport(this._providers.MAIN),
    };
  }

  getSeaportInstance(network: Network): Seaport {
    return this._seaports[network];
  }
  async listErc721(
    network: Network,
    {
      sellerAddress,
      buyerAddress,
      tokenId,
      tokenAddress,
      price,
    }: {
      sellerAddress: string;
      buyerAddress: string;
      tokenId: string;
      tokenAddress: string;
      price: number;
    },
  ) {
    const seaport = this.getSeaportInstance(network);

    const { executeAllActions } = await seaport.createOrder(
      {
        offer: [
          {
            amount: parseEther(`${price}`).toString(),
            token: tokenId,
          },
        ],
        consideration: [
          {
            itemType: ItemType.ERC721,
            token: tokenId,
            identifier: '1',
            recipient: sellerAddress,
          },
        ],
      },
      sellerAddress,
    );
    const order = await executeAllActions();
    const { executeAllActions: executeAllBuyerActions } =
      await seaport.fulfillOrder({
        order,
        accountAddress: buyerAddress,
      });
    const transactionHash = executeAllBuyerActions();
    return transactionHash;
  }
}
