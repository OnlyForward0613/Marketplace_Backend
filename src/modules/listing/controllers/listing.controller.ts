import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateListingDto } from '../dto/createListing.dto';
import { ListingService } from '../services/listing.service';

@Controller({
  version: '1',
})
export class ListingController {
  constructor(private readonly listingService: ListingService) {}
  @UseGuards(AccessTokenGuard)
  @Get()
  async getListings(@CurrentUser() actor: User) {
    return this.listingService.getListings(actor.id);
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
