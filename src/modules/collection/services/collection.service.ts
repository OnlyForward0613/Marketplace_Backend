// collection.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GeneratorService, Web3Service } from '@common/providers';
import { Collection, PeriodType, Prisma } from '@prisma/client';
import { SearchParams } from '@common/dto/search-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { maxUint256 } from 'viem';
import { FilterParams } from '@common/dto/filter-params.dto';
import { SortParams, StatsSortByOption } from '@common/dto/sort-params.dto';

@Injectable()
export class CollectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getCollections(
    { sortBy, sortAscending }: SortParams,
    { contains }: SearchParams,
    { period }: FilterParams,
    { offset = 1, startId = 0, limit }: PaginationParams,
  ) {
    const order = sortAscending === 'asc' ? 1 : -1;

    const start = startId * offset;
    const end = limit ? startId * offset + limit : -1;

    const collections = await this.prismaService.collection.findMany({
      where: {
        name: {
          contains,
          mode: 'insensitive',
        },
      },
      include: {
        avatar: true,
        banner: true,
        creator: true,
        stats: {
          where: {
            period,
          },
          take: 1,
        },
      },
    });

    switch (sortBy) {
      case StatsSortByOption.FLOOR:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.stats[0]?.floorPrice || BigInt(init);
            const second = b.stats[0]?.floorPrice || BigInt(init);

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
      case StatsSortByOption.ITEMS:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.supply || init;
            const second = b.supply || init;

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
      case StatsSortByOption.LIQUIDITY:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.stats[0]?.increased || init;
            const second = b.stats[0]?.increased || init;

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
      case StatsSortByOption.LISTED:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.stats[0]?.listedItems || init;
            const second = b.stats[0]?.listedItems || init;

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
      case StatsSortByOption.OWNERS:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.stats[0]?.owners || init;
            const second = b.stats[0]?.owners || init;

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
      case StatsSortByOption.SALES:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.stats[0]?.salesItems || init;
            const second = b.stats[0]?.salesItems || init;

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
      case StatsSortByOption.VOLUME:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.stats[0]?.volume || BigInt(init);
            const second = b.stats[0]?.volume || BigInt(init);

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
      default:
        return collections
          .sort((a, b) => {
            const init = order === 1 ? maxUint256 : 0;
            const first = a.stats[0]?.volume || BigInt(init);
            const second = b.stats[0]?.volume || BigInt(init);

            if (first > second) {
              return order * 1;
            } else if (first < second) {
              return order * -1;
            }
            return 0;
          })
          .slice(start, end);
    }
  }

  async getCollection(
    args: Prisma.CollectionFindUniqueArgs,
  ): Promise<Collection> {
    return await this.prismaService.collection.findUnique({
      ...args,
      include: {
        avatar: true,
        banner: true,
        creator: true,
        nfts: { select: { _count: true } },
        stats: true,
      },
    });
  }

  async getTopCollections({ period }: FilterParams) {
    const collections = await this.prismaService.collection.findMany({
      include: {
        stats: {
          where: {
            period,
          },
          take: 1,
        },
        avatar: true,
        banner: true,
      },
    });

    return collections
      .sort((a, b) => {
        const init = maxUint256;
        const first = a.stats[0]?.volume || BigInt(init);
        const second = b.stats[0]?.volume || BigInt(init);

        if (first > second) {
          return 1;
        } else if (first < second) {
          return -1;
        }
        return 0;
      })
      .slice(0, 12);
  }

  async getNotableCollections() {
    const collections = await this.prismaService.collection.findMany({
      include: {
        stats: {
          where: {
            period: PeriodType.ALL,
          },
          take: 1,
        },
        avatar: true,
        banner: true,
      },
    });

    return collections
      .sort((a, b) => {
        const init = maxUint256;
        const first = a.stats[0]?.volume || BigInt(init);
        const second = b.stats[0]?.volume || BigInt(init);

        if (first > second) {
          return 1;
        } else if (first < second) {
          return -1;
        }
        return 0;
      })
      .slice(0, 3);
  }

  async getFeaturedCollections() {
    return await this.prismaService.collection.findMany({
      where: {
        feature: true,
      },
      include: {
        stats: {
          where: {
            period: PeriodType.ALL,
          },
          take: 1,
        },
        avatar: true,
        banner: true,
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
