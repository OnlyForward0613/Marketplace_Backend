// collection.service.ts

import { Injectable } from '@nestjs/common';
import {
  CreateCollectionDto,
  CreateAttributeDto,
  NFTCollectionsDto,
} from '../dto/collection.dto';
import { PrismaService } from '@prisma/prisma.service';
import { InfuraService } from '@common/providers';

@Injectable()
export class CollectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly infuraService: InfuraService,
  ) {}
  async getCollections() {
    return this.prismaService.collection.findMany();
  }
}
