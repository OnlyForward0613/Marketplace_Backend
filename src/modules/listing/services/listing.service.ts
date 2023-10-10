import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ActivityType, ListingStatus, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { GeneratorService, Web3Service } from '@common/providers';
import { CreateListingDto } from '@modules/listing/dto/create-listing.dto';
import { ListingDto } from '../dto/listing.dto';

@Injectable()
export class ListingService {
  private logger = new Logger(ListingService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generatorService: GeneratorService,
    private readonly web3Service: Web3Service,
  ) {}

  async getListings(args: Prisma.ListingFindManyArgs) {
    return this.prismaService.listing.findMany({
      ...args,
      where: {
        status: ListingStatus.ACTIVE,
      },
    });
  }

  async getListing(args: Prisma.ListingFindFirstArgs) {
    return this.prismaService.listing.findFirst({
      ...args,
      where: {
        status: ListingStatus.ACTIVE,
      },
    });
  }

  async createListing(userId: string, data: CreateListingDto) {
    // const chainId = '5';
    try {
      const order = await this.web3Service.createSeaportListing(
        data.signature,
        data.parameters,
      );
      await this.prismaService.activity.create({
        data: {
          id: this.generatorService.uuid(),
          price: BigInt(order.message.offer[0].startAmount),
          actionType: ActivityType.LISTED,
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
      return await this.prismaService.listing.create({
        data: {
          id: this.generatorService.uuid(),
          nftId: undefined,
          price: BigInt(order.message.offer[0].startAmount),
          network: data.network,
          expiresAt: new Date(Number(order.message.endTime) * 1000),
          signature: data.signature,
          status: ListingStatus.ACTIVE,
          seller: {
            connect: {
              id: userId,
            },
          },
          nft: {
            connect: {
              id: data.nftId,
            },
          },
        } as Omit<Prisma.ListingCreateInput, 'nftId'>,
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async cancelListing(userId: string, data: ListingDto) {
    const listing = await this.prismaService.listing.findUnique({
      where: { id: data.id },
    });
    if (!listing)
      throw new HttpException('Invalid listing id', HttpStatus.BAD_REQUEST);

    const order = await this.web3Service.cancelListing(data);
    if (order.error !== '') {
      this.logger.error(order.error);
      throw new HttpException(order.error, HttpStatus.BAD_REQUEST);
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (user.walletAddress !== order.orderParameters.offerer)
      throw new HttpException(
        'Invalid Transaction Sender',
        HttpStatus.BAD_REQUEST,
      );

    await this.prismaService.activity.create({
      data: {
        id: this.generatorService.uuid(),
        price: BigInt(order.orderParameters.offer[0].startAmount),
        actionType: ActivityType.UNLISTED,
        txHash: data.txHash,
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

    return await this.prismaService.listing.update({
      where: {
        id: data.id,
      },
      data: {
        // ...listing,
        status: ListingStatus.INACTIVE,
      },
    });
  }

  async buyListing(userId: string, data: ListingDto) {
    const listing = await this.prismaService.listing.findUnique({
      where: { id: data.id },
    });
    if (!listing)
      throw new HttpException('Invalid listing id', HttpStatus.BAD_REQUEST);

    const result = await this.web3Service.buyListing(data);
    if (result.error !== '') {
      this.logger.error(result.error);
      throw new HttpException(result.error, HttpStatus.BAD_REQUEST);
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (user.walletAddress !== result.orderParameters.recipient)
      throw new HttpException(
        'Invalid Transaction Sender',
        HttpStatus.BAD_REQUEST,
      );

    await this.prismaService.activity.create({
      data: {
        id: this.generatorService.uuid(),
        price: result.orderParameters.consideration[0].amount,
        actionType: ActivityType.SOLD,
        txHash: data.txHash,
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

    return this.prismaService.listing.update({
      where: {
        id: data.id,
      },
      data: {
        ...listing,
        status: ListingStatus.SOLD,
      },
    });
  }
}
