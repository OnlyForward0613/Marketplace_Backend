// collection.controller.ts

import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { CollectionService } from '../services/collection.service';
import {
  CreateCollectionDto,
  CreateAttributeDto,
  NFTCollectionsDto,
} from '../dto/collection.dto';

@Controller({
  version: '1',
})
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}
  @Get()
  async getCollections() {
    return this.collectionService.getCollections();
  }
}
