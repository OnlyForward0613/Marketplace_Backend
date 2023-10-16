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
import { Collection } from '@prisma/client';
import { CollectionService } from '../services/collection.service';
import {
  CreateCollectionDto,
  CreateAttributeDto,
  NFTCollectionsDto,
} from '../dto/collection.dto';
import { AccessTokenGuard } from '@common/guards';
import { CurrentUser, Public } from '@common/decorators';
import { IPayloadUserJwt } from '@common/interfaces';

const moduleName = 'collection';

@ApiTags(moduleName)
@Controller(moduleName)
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @ApiOperation({ summary: 'Find all collections' })
  @ApiResponse({ status: 200, isArray: true })
  @Public()
  @Get()
  async getCollections(): Promise<Collection[]> {
    return this.collectionService.getCollections();
  }

  @ApiOperation({ summary: 'Create collection' })
  @ApiBody({ type: CreateCollectionDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createCollection(
    @CurrentUser() payload: IPayloadUserJwt,
    @Body() data: CreateCollectionDto,
  ) {
    return this.collectionService.createCollection(payload.id, data);
  }

  @ApiOperation({ summary: 'Find Collection by id' })
  @Public()
  @Get(':id')
  async getCollection(@Param('id') id: string) {
    return this.collectionService.getCollection({ where: { id: id } });
  }

  @ApiOperation({ summary: 'Get collection attributes by id' })
  @Post(':id/attributes')
  async createAttribute(
    @Param('id') id: string,
    @Body() createAttributeDto: CreateAttributeDto,
  ) {
    return this.collectionService.createAttribute(id, createAttributeDto);
  }

  @ApiOperation({ summary: 'Get contract' })
  @ApiBody({ type: NFTCollectionsDto })
  @Public()
  @Get('contracts')
  async getContracts(@Query() data: NFTCollectionsDto) {
    return this.collectionService.getConts(data);
  }
}
