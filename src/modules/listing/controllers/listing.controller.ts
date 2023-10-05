import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { User } from '@prisma/client';
import { CreateListingDto } from '../dto/createListing.dto';
import { ListingService } from '../services/listing.service';

const moduleName = 'listing';

@ApiTags(moduleName)
@Controller(moduleName)
export class ListingController {
  constructor(private readonly listingService: ListingService) {}

  @ApiOperation({ summary: 'Get NFT listings by user', description: '' })
  @UseGuards(AccessTokenGuard)
  @Get('user')
  async getListingsByUser(@CurrentUser() actor: User) {
    return this.listingService.getListingsByUser(actor.id);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  async postListing(
    @CurrentUser() actor: User,
    @Body() listingData: CreateListingDto,
  ) {
    return this.listingService.postListing(actor.id, listingData);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getListingById({ listingId }: { listingId: string }) {
    return this.listingService.getListingById(listingId);
  }
}
