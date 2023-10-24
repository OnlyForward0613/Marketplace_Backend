// collection.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GeneratorService, Web3Service } from '@common/providers';
import { Collection, Prisma } from '@prisma/client';

@Injectable()
export class CollectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getCollections() {
    return this.prismaService.collection.findMany({
      include: {
        avatar: true,
        banner: true,
        creator: true,
      },
    });
  }

  public async getCollection(
    args: Prisma.CollectionFindUniqueArgs,
  ): Promise<Collection> {
    return await this.prismaService.collection.findUnique({
      ...args,
      include: { avatar: true, banner: true, creator: true },
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

    await this.prismaService.stat.create({
      data: {
        id: this.generatorService.uuid(),
        collectionId: collection.id,
        owners: 0,
        listedItems: 0,
        salesItems: 0,
        floorPrice: 0,
        volume: 0,
      },
    });

    return collection;
  }
}
