
import { Controller, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MarketplaceService } from '../services/marketplace.service';

@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('buy/:tokenId')
  async buyItem(
    @Param('tokenId', ParseIntPipe) tokenId: number,
    @Body('buyerAddress') buyerAddress: string,
  ): Promise<void> {
    await this.marketplaceService.buyItem(tokenId, buyerAddress);
  }

  @Post('sell')
  async sellItem(@Body('sellerAddress') sellerAddress: string, @Body('price') price: string): Promise<void> {
    await this.marketplaceService.sellItem(sellerAddress, price);
  }
}
