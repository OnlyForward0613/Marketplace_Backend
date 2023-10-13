// nft.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { ActivityType, NFT, Prisma } from '@prisma/client';

import { GeneratorService } from '@common/providers';
import { CreateNftDto } from '../dto/create-nft.dto';

@Injectable()
export class NftService {
  constructor(
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getNft(args: Prisma.NFTFindUniqueOrThrowArgs): Promise<NFT> {
    return this.prismaService.nFT.findUnique({
      include: {
        collection: true,
        owner: true,
      },
      ...args,
    });
  }

  async getNfts(args: Prisma.NFTFindManyArgs): Promise<NFT[]> {
    return this.prismaService.nFT.findMany({
      include: {
        collection: true,
        owner: true,
      },
      ...args,
    });
  }

  async createNft(userId: string, data: CreateNftDto): Promise<NFT> {
    const newNft = await this.prismaService.nFT.create({
      data: {
        ...data,
        price: undefined,
        txHash: undefined,
        id: this.generatorService.uuid(),
        collectionId: undefined,
        creatorId: undefined,
        attributes: data.attributes as Prisma.InputJsonValue,
        collection: {
          connect: {
            id: data.collectionId,
          },
        },
        minter: {
          connect: {
            id: userId,
          },
        },
        owner: {
          connect: {
            id: userId,
          },
        },
      } as Omit<Prisma.NFTCreateInput, 'collectionId'>,
    });

    await this.prismaService.activity.create({
      data: {
        id: this.generatorService.uuid(),
        price: data.price,
        actionType: ActivityType.MINTED,
        txHash: data.txHash,
        nft: {
          connect: {
            id: newNft.id,
          },
        },
        seller: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return newNft;
  }
}
