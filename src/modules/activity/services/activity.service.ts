// activity.service.ts

import {
  FilterParams,
  UserFilterByOption,
} from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { SearchParams } from '@common/dto/search-params.dto';
import {
  CollectionSortByOption,
  SortParams,
} from '@common/dto/sort-params.dto';
import { Injectable } from '@nestjs/common';
import { ActivityType, Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActivities(args: Prisma.ActivityFindManyArgs) {
    return await this.prismaService.activity.findMany({
      ...args,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        nft: true,
        seller: {
          include: {
            profile: {
              include: {
                avatar: true,
              },
            },
          },
        },
        buyer: {
          include: {
            profile: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async getActivitiesByUser(
    userId: string,
    { filterBy }: FilterParams,
    { offset = 1, limit = 20, startId = 0 }: PaginationParams,
  ) {
    switch (filterBy) {
      case UserFilterByOption.ACTIVITY:
        return await this.prismaService.activity.findMany({
          where: {
            OR: [{ buyerId: userId }, { sellerId: userId }],
          },
          skip: offset * startId,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            buyer: true,
            seller: true,
            nft: true,
          },
        });
      default:
        return [];
    }
  }
}
