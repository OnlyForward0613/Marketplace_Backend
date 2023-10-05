import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { User } from '@prisma/client';
import { OfferService } from '../services/offer.service';
import { CreateOfferDto } from '../dto/create-offer.dto';

const moduleName = 'offer';

@ApiTags(moduleName)
@Controller(moduleName)
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @ApiOperation({ summary: 'Get NFT offers by seller', description: '' })
  @UseGuards(AccessTokenGuard)
  @Get('sell')
  async getSellOffers(@CurrentUser() actor: User) {
    return this.offerService.getSellOffers(actor.id);
  }

  @ApiOperation({ summary: 'Get NFT offers by buyer', description: '' })
  @UseGuards(AccessTokenGuard)
  @Get('buy')
  async getBuyOffers(@CurrentUser() actor: User) {
    return this.offerService.getBuyOffers(actor.id);
  }

  @ApiOperation({ summary: 'Create NFT offer', description: '' })
  @UseGuards(AccessTokenGuard)
  @Post()
  async postOffer(@CurrentUser() actor: User, @Body() data: CreateOfferDto) {
    return this.offerService.createInitialOffer(actor.id, data);
  }
}
