// collection.service.ts

import { GeneratorService } from '@common/providers';
import { Injectable } from '@nestjs/common';
import { OfferStatus } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { CreateOfferDto } from '../dto/create-offer.dto';

@Injectable()
export class OfferService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generatorService: GeneratorService,
  ) {}

  async getSellOffers(userId: string) {
    return this.prismaService.offer.findMany({
      where: {
        sellerId: userId,
      },
    });
  }
  async getBuyOffers(userId: string) {
    return this.prismaService.offer.findMany({
      where: {
        buyerId: userId,
      },
    });
  }
  async getOfferById(offerId: string) {
    return this.prismaService.offer.findUnique({
      where: {
        id: offerId,
      },
    });
  }
  async createInitialOffer(userId: string, offerData: CreateOfferDto) {
    return this.prismaService.offer.create({
      data: {
        id: this.generatorService.uuid(),
        status: OfferStatus.CREATED,
        sellerId: userId,
        ...offerData,
      },
    });
  }
  async createFinalOffer(
    offerId: string,
    status: OfferStatus,
    txHash?: string,
  ) {
    return this.prismaService.offer.update({
      where: {
        id: offerId,
      },
      data: {
        status,
        txHash,
      },
    });
  }
}
