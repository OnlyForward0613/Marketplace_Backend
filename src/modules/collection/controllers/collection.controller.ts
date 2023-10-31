// collection.controller.ts

import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Collection, User } from '@prisma/client';
import { AccessTokenGuard } from '@common/guards';
import { CurrentUser, Public } from '@common/decorators';
import { CollectionService } from '../services/collection.service';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { SearchParams } from '@common/dto/search-params.dto';

const moduleName = 'collection';

@ApiTags(moduleName)
@Controller(moduleName)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Find all collections' })
  @Public()
  @Get()
  async getCollections(
    @Query() search: SearchParams,
    @Query() pagination: PaginationParams,
  ): Promise<Collection[]> {
    return this.collectionService.getCollections(search, pagination);
  }

  @ApiOperation({ summary: 'Find Collection by id' })
  @Public()
  @Get(':id')
  async getCollection(@Param('id') id: string) {
    return this.collectionService.getCollection({ where: { id } });
  }

  @ApiOperation({ summary: 'Create collection', description: 'forbidden' })
  @ApiBody({ type: CreateCollectionDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createCollection(
    @CurrentUser() user: User,
    @Body() data: CreateCollectionDto,
  ) {
    return this.collectionService.createCollection(user.id, data);
  }
}
