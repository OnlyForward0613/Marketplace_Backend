import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { ListingStatus, User } from '@prisma/client';
import { CreateListingDto } from '../dto/create-listing.dto';
import { ListingService } from '../services/listing.service';
import { ListingDto } from '../dto/listing.dto';

const moduleName = 'listing';

@ApiTags(moduleName)
@Controller(moduleName)
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @ApiOperation({ summary: 'Get all listings' })
  @Public()
  @Get()
  async getAllListings() {
    return this.listingService.getListings({
      where: { status: ListingStatus.ACTIVE },
      include: {
        seller: true,
        nft: true,
      },
    });
  }

  @ApiOperation({
    summary: 'Get listings by user id',
    description: 'forbidden',
  })
  @UseGuards(AccessTokenGuard)
  @Get('mine')
  async getListingsByUser(@CurrentUser() user: User) {
    return this.listingService.getListings({
      where: { sellerId: user.id, status: ListingStatus.ACTIVE },
      include: {
        nft: true,
      },
    });
  }

  @ApiOperation({ summary: 'Get listing by nft id', description: 'public' })
  @Public()
  @Get('nft/:id')
  async getListingsByNftId(@Param('id') id: string) {
    return this.listingService.getListing({
      where: { nftId: id, status: ListingStatus.ACTIVE },
      include: {
        nft: true,
        seller: true,
      },
    });
  }

  @ApiOperation({ summary: 'Get listing by id' })
  @Public()
  @Get(':id')
  async getListingById(@Param('id') id: string) {
    return this.listingService.getListing({
      where: { id, status: ListingStatus.ACTIVE },
      include: {
        nft: true,
        seller: true,
      },
    });
  }

  @ApiOperation({ summary: 'List nft', description: 'forbidden' })
  @ApiBody({ type: CreateListingDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createListing(
    @CurrentUser() user: User,
    @Body() data: CreateListingDto,
  ) {
    return this.listingService.createListing(user.id, data);
  }

  @ApiOperation({ summary: 'Cancel nft', description: 'forbidden' })
  @ApiBody({ type: ListingDto })
  @UseGuards(AccessTokenGuard)
  @Delete()
  async cancelListing(@CurrentUser() user: User, @Body() data: ListingDto) {
    return this.listingService.cancelListing(user.id, data);
  }

  @ApiOperation({ summary: 'Buy nft', description: 'forbidden' })
  @ApiBody({ type: ListingDto })
  @UseGuards(AccessTokenGuard)
  @Post('buy')
  async buyListing(@CurrentUser() user: User, @Body() data: ListingDto) {
    return this.listingService.buyListing(user.id, data);
  }
}
