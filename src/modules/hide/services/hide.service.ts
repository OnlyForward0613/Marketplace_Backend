// hide.service.ts

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
export class HideService {
  private logger = new Logger(HideService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getHidesByUser(
    userId: string,
    { filterBy }: FilterParams,
    { offset = 1, limit = 20, startId = 0 }: PaginationParams,
  ) {
    switch (filterBy) {
      case UserFilterByOption.HIDDEN:
        return await this.prismaService.hide.findMany({
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

  async createHide(userId: string, nftId: string) {
    return await this.prismaService.hide.create({
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
      } as Omit<Prisma.HideCreateInput, 'userId' | 'nftId'>,
    });
  }

  async deleteHide(nftId: string, userId: string) {
    try {
      const hide = await this.prismaService.hide.findFirst({
        where: { nftId, userId },
      });
      if (!hide)
        throw new HttpException(
          'Invalid nftId or userId',
          HttpStatus.EXPECTATION_FAILED,
        );

      return await this.prismaService.hide.delete({
        where: { id: hide.id },
      });
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
