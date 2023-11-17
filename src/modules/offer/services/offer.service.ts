// offer.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import {
  ActivityType,
  NotificationType,
  OfferStatus,
  Prisma,
} from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

import { GeneratorService, Web3Service } from '@common/providers';
import { OrderComponent } from '@common/types';
import {
  FilterParams,
  UserFilterByOption,
} from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { NotificationService } from '@modules/notification/services/notification.service';

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
    private readonly notificationService: NotificationService,
  ) {}

  async getOffers(args: Prisma.OfferFindManyArgs) {
    return await this.prismaService.offer.findMany(args);
  }

  async getOffer(args: Prisma.OfferFindUniqueOrThrowArgs) {
    return await this.prismaService.offer.findUniqueOrThrow(args);
  }

  async getOffersByUser(
    userId: string,
    { filterBy }: FilterParams,
    { offset = 1, limit = 20, startId = 0 }: PaginationParams,
  ) {
    const query = {
      skip: offset * startId,
      take: limit,
      include: {
        nft: true,
        buyer: true,
        seller: true,
      },
    };
    switch (filterBy) {
      case UserFilterByOption.BUY_OFFER:
        return await this.prismaService.offer.findMany({
          where: {
            buyerId: userId,
          },
          orderBy: {
            createdAt: 'desc',
          },
          ...query,
        });
      case UserFilterByOption.SELL_OFFER:
        return await this.prismaService.offer.findMany({
          where: {
            sellerId: userId,
          },
          orderBy: {
            createdAt: 'desc',
          },
          ...query,
        });
      default:
        return [];
    }
  }

  async createOffer(userId: string, data: CreateOfferDto) {
    const nft = await this.prismaService.nFT.findUnique({
      where: {
        id: data.nftId,
      },
    });
    if (!nft)
      throw new HttpException('Invalid nft id', HttpStatus.EXPECTATION_FAILED);

    try {
      const parameters: OrderComponent = JSON.parse(data.parameters);
      const price = BigInt(parameters.offer[0].startAmount);

      const newOffer = await this.prismaService.offer.create({
        data: {
          id: this.generatorService.uuid(),
          offerPrice: price,
          signature: data.signature,
          parameters: data.parameters,
          status: OfferStatus.CREATED,
          nft: {
            connect: {
              id: nft.id,
            },
          },
          seller: {
            connect: {
              id: nft.ownerId,
            },
          },
          buyer: {
            connect: {
              id: userId,
            },
          },
        },
      });

      const activity = await this.prismaService.activity.create({
        data: {
          id: this.generatorService.uuid(),
          price,
          actionType: ActivityType.CREATED_OFFER,
          txHash: '',
          nft: {
            connect: {
              id: nft.id,
            },
          },
          buyer: {
            connect: {
              id: userId,
            },
          },
          seller: {
            connect: {
              id: nft.ownerId,
            },
          },
        },
      });

      // TODO: need to validate if the seller's minOfferThreshold is valid
      this.logger.log('Creating notification for seller to get new offer');
      await this.notificationService.createNotification(nft.ownerId, {
        activityId: activity.id,
        type: NotificationType.NEW_OFFER,
      });

      return newOffer;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
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

    const updatedOffer = await this.prismaService.offer.update({
      where: {
        id: data.id,
      },
      data: {
        ...offer,
        status: OfferStatus.CANCELED,
      },
    });

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

    return updatedOffer;
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

    try {
      const updatedOffer = await this.prismaService.offer.update({
        where: {
          id: data.id,
        },
        data: {
          ...offer,
          status: OfferStatus.ACCEPTED,
        },
      });

      await this.prismaService.nFT.update({
        where: {
          id: offer.nftId,
        },
        data: {
          ownerId: userId,
        },
      });

      const activity = await this.prismaService.activity.create({
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

      // TODO: need to validate if the buyer's minOfferThreshold is valid
      this.logger.log(
        'Creating notification for buyer to nft offer is accepted',
      );
      await this.notificationService.createNotification(offer.buyerId, {
        activityId: activity.id,
        type: NotificationType.OFFER_ACCEPTED,
      });

      return updatedOffer;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
