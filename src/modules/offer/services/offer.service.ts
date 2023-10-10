import { GeneratorService, Web3Service } from '@common/providers';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ActivityType, OfferStatus } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import * as defs from '@common/types';
import { CreateOfferDto } from '../dto/create-offer.dto';
import { CancelOfferDto } from '../dto/cancel-offer.dto';
import { AcceptOfferDto } from '../dto/accept-offer.dto';

@Injectable()
export class OfferService {
  private logger = new Logger(OfferService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generatorService: GeneratorService,
    private readonly web3Service: Web3Service,
  ) {}

  async getSellOffers(userId: string) {
    return this.prismaService.offer.findMany({
      where: {
        sellerId: userId,
      },
      include: {
        nft: true,
      },
    });
  }
  async getBuyOffers(userId: string) {
    return this.prismaService.offer.findMany({
      where: {
        buyerId: userId,
      },
      include: {
        nft: true,
      },
    });
  }
  async getOfferByNftId(nftId: string) {
    return this.prismaService.offer.findMany({
      where: {
        nftId,
      },
      include: {
        buyer: true,
      },
    });
  }
  async createInitialOffer(userId: string, data: CreateOfferDto) {
    const listing = await this.prismaService.listing.findUnique({
      where: {
        id: data.listingId,
      },
    });
    if (!listing)
      throw new HttpException(
        'Invalid listing id',
        HttpStatus.EXPECTATION_FAILED,
      );

    const parameters: defs.Parameters = JSON.parse(data.parameters);

    await this.prismaService.activity.create({
      data: {
        id: this.generatorService.uuid(),
        price: BigInt(parameters.message.offer[0].startAmount),
        actionType: ActivityType.CREATED_OFFER,
        txHash: '',
        nft: {
          connect: {
            id: data.nftId,
          },
        },
        seller: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return this.prismaService.offer.create({
      data: {
        id: this.generatorService.uuid(),
        offerPrice: BigInt(parameters.message.offer[0].startAmount),
        signature: data.signature,
        status: OfferStatus.CREATED,
        nft: {
          connect: {
            id: data.nftId,
          },
        },
        seller: {
          connect: {
            id: listing.sellerId,
          },
        },
        buyer: {
          connect: {
            id: userId,
          },
        },
        listing: {
          connect: {
            id: data.listingId,
          },
        },
      },
    });
  }

  async cancelOffer(userId: string, data: CancelOfferDto) {
    const offer = await this.prismaService.offer.findUnique({
      where: { id: data.id },
    });
    if (!offer)
      throw new HttpException(
        'Invalid offer id',
        HttpStatus.EXPECTATION_FAILED,
      );

    if (userId !== offer.buyerId)
      throw new HttpException('Invalid offerer', HttpStatus.EXPECTATION_FAILED);

    await this.prismaService.activity.create({
      data: {
        id: this.generatorService.uuid(),
        price: offer.offerPrice,
        actionType: ActivityType.CANCELED_OFFER,
        txHash: '',
        nft: {
          connect: {
            id: offer.nftId,
          },
        },
        seller: {
          connect: {
            id: offer.sellerId,
          },
        },
        buyer: {
          connect: {
            id: offer.buyerId,
          },
        },
      },
    });

    return await this.prismaService.offer.update({
      where: {
        id: data.id,
      },
      data: {
        ...offer,
        status: OfferStatus.CANCELED,
      },
    });
  }

  async acceptOffer(userId: string, data: AcceptOfferDto) {
    const offer = await this.prismaService.offer.findUnique({
      where: { id: data.id },
    });
    if (!offer)
      throw new HttpException(
        'Invalid offer id',
        HttpStatus.EXPECTATION_FAILED,
      );

    if (userId !== offer.sellerId)
      throw new HttpException('Invalid seller', HttpStatus.EXPECTATION_FAILED);

    const result = await this.web3Service.acceptOffer(data);
    if (result.error !== '') {
      this.logger.error(result.error);
      throw new HttpException(result.error, HttpStatus.EXPECTATION_FAILED);
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (user.walletAddress !== result.orderParameters.recipient)
      throw new HttpException(
        'Invalid Transaction Sender',
        HttpStatus.EXPECTATION_FAILED,
      );

    await this.prismaService.activity.create({
      data: {
        id: this.generatorService.uuid(),
        price: result.orderParameters.consideration[0].amount,
        actionType: ActivityType.SOLD,
        txHash: data.txHash,
        nft: {
          connect: {
            id: offer.nftId,
          },
        },
        seller: {
          connect: {
            id: offer.sellerId,
          },
        },
        buyer: {
          connect: {
            id: offer.buyerId,
          },
        },
      },
    });

    return this.prismaService.offer.update({
      where: {
        id: data.id,
      },
      data: {
        ...offer,
        status: OfferStatus.ACCEPTED,
      },
    });
  }
}
