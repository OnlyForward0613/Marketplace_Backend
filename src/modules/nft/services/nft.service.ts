// nft.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { NFT, Prisma } from '@prisma/client';

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

  async createNft(userId: string, createNftDto: CreateNftDto): Promise<NFT> {
    return this.prismaService.nFT.create({
      data: {
        ...createNftDto,
        id: this.generatorService.uuid(),
        collectionId: undefined,
        creatorId: undefined,
        attributes: createNftDto.attributes as Prisma.InputJsonValue,
        collection: {
          connect: {
            id: createNftDto.collectionId,
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
  }
}
