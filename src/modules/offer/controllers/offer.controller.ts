import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
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

  @ApiOperation({ summary: 'Create new offer', description: 'forbidden' })
  @ApiBody({ type: CreateOfferDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createOffer(@CurrentUser() actor: User, @Body() data: CreateOfferDto) {
    return this.offerService.createInitialOffer(actor.id, data);
  }

  @ApiOperation({ summary: 'Cancel offer', description: 'forbidden' })
  @ApiBody({ type: CancelOfferDto })
  @UseGuards(AccessTokenGuard)
  @Delete()
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
