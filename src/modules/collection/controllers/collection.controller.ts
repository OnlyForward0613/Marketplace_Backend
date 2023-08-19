// collection.controller.ts

import { Controller, Post, Body, Param } from '@nestjs/common';
import { CollectionService } from '../services/collection.service';
import { CreateCollectionDto, CreateAttributeDto } from '../dto/collection.dto';

@Controller('collections')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  async createCollection(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.createCollection(createCollectionDto);
  }

  @Post(':collectionId/attributes')
  async createAttribute(@Param('collectionId') collectionId: string, @Body() createAttributeDto: CreateAttributeDto) {
    return this.collectionService.createAttribute(collectionId, createAttributeDto);
  }
}