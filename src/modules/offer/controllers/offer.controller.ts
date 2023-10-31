// offer.controller.ts

import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { FilterParams } from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
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

  @ApiOperation({ summary: 'Get offers by user', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Get('user')
  async getUserListings(
    @CurrentUser() user: User,
    @Query() filter: FilterParams,
    @Query() pagination: PaginationParams,
  ) {
    return await this.offerService.getOffersByUser(user.id, filter, pagination);
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
