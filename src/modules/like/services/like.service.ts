// like.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { GeneratorService } from '@common/providers';
import {
  FilterParams,
  UserFilterByOption,
} from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';

@Injectable()
export class LikeService {
  private logger = new Logger(LikeService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getLikesByUser(
    userId: string,
    { filterBy }: FilterParams,
    { offset = 1, limit = 20, startId = 0 }: PaginationParams,
  ) {
    switch (filterBy) {
      case UserFilterByOption.FAVORITE:
        return await this.prismaService.like.findMany({
          where: {
            userId,
          },
          skip: offset * startId,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            nft: {
              include: {
                owner: true,
              },
            },
          },
        });
    }
  }

  async createLike(userId: string, nftId: string) {
    return await this.prismaService.like.create({
      data: {
        id: this.generatorService.uuid(),
        userId: undefined,
        nftId: undefined,
        user: {
          connect: {
            id: userId,
          },
        },
        nft: {
          connect: {
            id: nftId,
          },
        },
      } as Omit<Prisma.LikeCreateInput, 'userId' | 'nftId'>,
    });
  }

  async deleteLike(id: string, userId: string) {
    try {
      return await this.prismaService.like.delete({
        where: { id, userId },
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
