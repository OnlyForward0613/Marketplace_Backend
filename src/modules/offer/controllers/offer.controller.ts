import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { User } from '@prisma/client';
import { OfferService } from '../services/offer.service';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { CancelOfferDto } from '../dto/cancel-offer.dto';
import { AcceptOfferDto } from '../dto/accept-offer.dto';

const moduleName = 'offer';

@ApiTags(moduleName)
@Controller(moduleName)
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiOperation({
    summary: 'Get NFT offer by id',
  })
  @Public()
  @Get(':id')
  async getOfferById(@Param('id') id: string) {
    return this.offerService.getOffer({
      where: {
        id,
      },
      include: {
        nft: true,
        seller: true,
        buyer: true,
        listing: true,
      },
    });
  }

  @ApiOperation({
    summary: 'Get NFT offers by nft id',
  })
  @Public()
  @Get('nft/:nftId')
  async getOffersByNft(@Param('nftId') nftId: string) {
    return await this.offerService.getOffers({
      where: {
        nftId,
      },
      include: {
        buyer: true,
      },
    });
  }

  @ApiOperation({
    summary: 'Get NFT offers as a seller',
    description: 'forbidden',
  })
  @UseGuards(AccessTokenGuard)
  @Post('sell')
  async getSellOffers(@CurrentUser() user: User) {
    console.log(user.id);
    return await this.offerService.getOffers({
      where: {
        sellerId: user.id,
      },
      include: {
        nft: true,
      },
    });
  }

  @ApiOperation({
    summary: 'Get NFT offers as a buyer',
    description: 'forbidden',
  })
  @UseGuards(AccessTokenGuard)
  @Post('buy')
  async getBuyOffers(@CurrentUser() user: User) {
    return await this.offerService.getOffers({
      where: {
        buyerId: user.id,
      },
      include: {
        nft: true,
      },
    });
  }

  @ApiOperation({ summary: 'Create new offer', description: 'forbidden' })
  @ApiBody({ type: CreateOfferDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createOffer(@CurrentUser() actor: User, @Body() data: CreateOfferDto) {
    return this.offerService.createOffer(actor.id, data);
  }

  @ApiOperation({ summary: 'Cancel offer', description: 'forbidden' })
  @ApiBody({ type: CancelOfferDto })
  @UseGuards(AccessTokenGuard)
  @Post('cancel')
  async cancelOffer(@CurrentUser() actor: User, @Body() data: CancelOfferDto) {
    return this.offerService.cancelOffer(actor.id, data);
  }

  @ApiOperation({ summary: 'Accept offer', description: 'forbidden' })
  @ApiBody({ type: AcceptOfferDto })
  @UseGuards(AccessTokenGuard)
  @Post('accept')
  async acceptOffer(@CurrentUser() actor: User, @Body() data: AcceptOfferDto) {
    return this.offerService.acceptOffer(actor.id, data);
  }
}
