import { GeneratorService } from '@common/providers';
import { CreateListingDto } from '@modules/listing/dto/createListing.dto';
import { Injectable } from '@nestjs/common';
import { ListingStatus } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ListingService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generatorService: GeneratorService,
  ) {}
  async getListings(userId: string) {
    return this.prismaService.listing.findMany({
      where: {
        sellerId: userId,
      },
      include: {
        nft: true,
      },
    });
  }
  async getListingById(listingId) {
    return this.prismaService.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        seller: true,
        nft: true,
      },
    });
  }
  async postListing(
    userId: string,
    { price, nftId, network }: CreateListingDto,
  ) {
    return this.prismaService.listing.create({
      data: {
        id: this.generatorService.uuid(),
        price,
        network,
        status: ListingStatus.ACTIVE,
        sellerId: userId,
        nftId,
      },
    });
  }
}
