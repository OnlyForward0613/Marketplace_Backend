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
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Collection, User } from '@prisma/client';
import { AccessTokenGuard } from '@common/guards';
import { CurrentUser, Public } from '@common/decorators';
import { CollectionService } from '../services/collection.service';
import { CreateCollectionDto } from '../dto/create-collection.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { SearchParams } from '@common/dto/search-params.dto';
import { FilterParams } from '@common/dto/filter-params.dto';
import { SortParams } from '@common/dto/sort-params.dto';

const moduleName = 'collection';

@ApiTags(moduleName)
@Controller(moduleName)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Find all collections' })
  @Public()
  @Get()
  async getCollections(
    @Query() sort: SortParams,
    @Query() search: SearchParams,
    @Query() filter: FilterParams,
    @Query() pagination: PaginationParams,
  ): Promise<Collection[]> {
    return await this.collectionService.getCollections(
      sort,
      search,
      filter,
      pagination,
    );
  }

  @ApiOperation({ summary: 'Find Collection by id' })
  @Public()
  @Get('id/:id')
  async getCollection(@Param('id') id: string) {
    return await this.collectionService.getCollection({ where: { id } });
  }

  @ApiOperation({ summary: 'Get top collections' })
  @Public()
  @Get('top')
  async getTopCollections(
    @Query() filter: FilterParams,
  ): Promise<Collection[]> {
    return await this.collectionService.getTopCollections(filter);
  }

  @ApiOperation({ summary: 'Get notable collections' })
  @Get('notable')
  async getNotableCollections() {
    return await this.collectionService.getNotableCollections();
  }

  @ApiOperation({ summary: 'Get featured collections' })
  @Get('feature')
  async getFeaturedCollections() {
    return await this.collectionService.getFeaturedCollections();
  }

  @ApiOperation({ summary: 'Create collection', description: 'forbidden' })
  @ApiBody({ type: CreateCollectionDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createCollection(
    @CurrentUser() user: User,
    @Body() data: CreateCollectionDto,
  ) {
    return await this.collectionService.createCollection(user.id, data);
  }
}
