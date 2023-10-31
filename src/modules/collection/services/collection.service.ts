// collection.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GeneratorService, Web3Service } from '@common/providers';
import { Collection, PeriodType, Prisma } from '@prisma/client';
import { SearchParams } from '@common/dto/search-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';

@Injectable()
export class CollectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getCollections(
    { contains }: SearchParams,
    { offset = 1, limit = 4, startId = 0 }: PaginationParams,
  ) {
    return this.prismaService.collection.findMany({
      where: {
        name: { contains: contains ? contains.slice(0, 2) : undefined },
      },
      include: {
        avatar: true,
        banner: true,
        creator: true,
      },
      skip: offset * startId,
      take: limit,
    });
  }

  public async getCollection(
    args: Prisma.CollectionFindUniqueArgs,
  ): Promise<Collection> {
    return await this.prismaService.collection.findUnique({
      ...args,
      include: {
        avatar: true,
        banner: true,
        creator: true,
        nfts: { select: { _count: true } },
      },
    });
  }

  async createCollection(
    userId: string,
    data: Omit<Prisma.CollectionCreateInput, 'id' | 'creator'>,
  ) {
    const collection = await this.prismaService.collection.create({
      data: {
        ...data,
        id: this.generatorService.uuid(),
        creator: {
          connect: {
            id: userId,
          },
        },
      },
    });

    for (const period of Object.values(PeriodType)) {
      await this.prismaService.stat.create({
        data: {
          id: this.generatorService.uuid(),
          collectionId: collection.id,
          owners: 0,
          listedItems: 0,
          salesItems: 0,
          floorPrice: BigInt(0),
          volume: BigInt(0),
          period,
        },
      });
    }

    return collection;
  }
}
