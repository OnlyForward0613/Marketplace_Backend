import { Injectable } from '@nestjs/common';
import { Seaport } from '@opensea/seaport-js';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class MarketplaceService {
  private seaport: OpenSeaPort;

  constructor(private readonly prismaService: PrismaService) {
    // Initialize Seaport instance with your Ethereum provider and OpenSea API key
    this.seaport = new Seaport(yourEthereumProvider, { apiKey: 'your_opensea_api_key', networkName: Network.Rinkeby });
  }

  async buyItem(itemTokenId: string, buyerAddress: string): Promise<void> {
    // Logic to buy an item
    const item = await this.prismaService.item.findUnique({ where: { id: itemTokenId } });
    if (!item) {
      throw new Error('Item not found');
    }

    // Perform transaction using Seaport
    const transactionHash = await this.seaport.fulfillOrder({
      order: {
        maker: item.seller.walletAddress,
        taker: buyerAddress,
        makerAsset: {
          tokenId: item.tokenId,
          tokenAddress: '0x...',
          schemaName: 'ERC721',
        },
        takerAsset: {
          tokenId: item.tokenId,
          tokenAddress: '0x...',
          schemaName: 'ERC721',
        },
      },
      accountAddress: buyerAddress,
    });

    // Update item status in your database
    await this.prismaService.item.update({
      where: { id: itemTokenId },
      data: { buyerId: buyerAddress, status: 'sold', transactionHash },
    });
  }

  async sellItem(sellerAddress: string, price: string): Promise<void> {
    // Logic to list an item for sale
    const newItem = await this.prismaService.item.create({
      data: { sellerId: sellerAddress, price, status: 'listed' },
    });

    // Create and list the item on OpenSea using Seaport
    const listing = await this.seaport.createSellOrder({
      asset: {
        tokenId: newItem.tokenId,
        tokenAddress: '0x...',
        schemaName: 'ERC721',
      },
      accountAddress: sellerAddress,
      startAmount: price,
    });

    // Update item listing status in your database
    await this.prismaService.item.update({
      where: { id: newItem.id },
      data: { listingStatus: 'listed', listingTransactionHash: listing.transactionHash },
    });
  }
}
