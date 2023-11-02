// listing.controller.ts

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
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { ListingStatus, User } from '@prisma/client';
import { CreateListingDto } from '../dto/create-listing.dto';
import { ListingService } from '../services/listing.service';
import { ListingDto } from '../dto/listing.dto';
import { FilterParams } from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';

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
        nft: {
          include: {
            owner: true,
          },
        },
      },
    });
  }

  @ApiOperation({ summary: 'Get listings by user', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Get('user')
  async getUserListings(
    @CurrentUser() user: User,
    @Query() pagination: PaginationParams,
  ) {
    return await this.listingService.getLisitingsByUser(
      user.id,
      pagination,
    );
  }

  @ApiOperation({ summary: 'Get listing by nft id', description: 'public' })
  @Public()
  @Get('nft/:id')
  async getListingsByNftId(@Param('id') id: string) {
    return this.listingService.getListing({
      where: { nftId: id, status: ListingStatus.ACTIVE },
    });
  }

  @ApiOperation({ summary: 'Get listing by id' })
  @Public()
  @Get(':id')
  async getListingById(@Param('id') id: string) {
    return this.listingService.getListing({
      where: { id, status: ListingStatus.ACTIVE },
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
  @Post('cancel')
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
