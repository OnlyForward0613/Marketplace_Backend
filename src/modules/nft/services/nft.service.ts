// nft.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { GeneratorService } from '@common/providers';
import { CreateNftDto } from '../dto/nft.dto';

@Injectable()
export class NftService {
  constructor(
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getNfts(args: Prisma.NFTFindManyArgs) {
    return this.prismaService.nFT.findMany({
      include: {
        collection: true,
        owner: true,
      },
      ...args,
    });
  }

  async createNft(createNftDto: CreateNftDto) {
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
            id: createNftDto.creatorId,
          },
        },
        owner: {
          connect: {
            id: createNftDto.creatorId,
          },
        },
      } as Omit<Prisma.NFTCreateInput, 'collectionId' | 'creatorId'>,
    });
  }
}
