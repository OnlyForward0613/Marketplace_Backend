// collection.service.ts

import { Injectable } from '@nestjs/common';
import {
  CreateCollectionDto,
  CreateAttributeDto,
  NFTCollectionsDto,
} from '../dto/collection.dto';
import { PrismaService } from '@prisma/prisma.service';
import { Web3Service } from '@common/providers';

@Injectable()
export class CollectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly web3Service: Web3Service,
  ) {}
  async getCollections() {
    return this.prismaService.collection.findMany();
  }
  async createCollection(createCollectionDto: CreateCollectionDto) {
    // Logic to create a new collection
  }

  async createAttribute(
    collectionId: string,
    createAttributeDto: CreateAttributeDto,
  ) {
    // Logic to create an attribute for a collection
  }
  async getContracts() {
    return this.web3Service.getERC721Contracts();
  }
  async getConts({ chainId, walletAddress }: NFTCollectionsDto) {
    return this.web3Service.getNFTSbyAddress({ chainId, walletAddress });
  }
}
