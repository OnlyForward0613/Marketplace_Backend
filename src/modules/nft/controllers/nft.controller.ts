// nft.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NftService } from '../services/nft.service';
import { CreateNftDto } from '../dto/create-nft.dto';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { GetNftDto, PaginationDto } from '../dto/get-nft.dto';
import { User } from '@prisma/client';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { SearchParams } from '@common/dto/search-params.dto';
import { SortParams } from '@common/dto/sort-params.dto';
import { FilterParams } from '@common/dto/filter-params.dto';

const moduleName = 'nft';

@ApiTags(moduleName)
@Controller(moduleName)
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @ApiOperation({ summary: 'Find all nfts by collection id' })
  @Public()
  @Get('collection/:collectionId')
  async getNftsByCollection(
    @Param('collectionId') collectionId: string,
    @Query() sort: SortParams,
    @Query() search: SearchParams,
    @Query() pagination: PaginationParams,
  ) {
    return await this.nftService.getNftsByCollection(
      collectionId,
      sort,
      search,
      pagination,
    );
  }

  @ApiOperation({ summary: 'Find all nfts by user id' })
  @Public()
  @Get('user/:userId')
  async getNftsByUser(
    @Param('userId') userId: string,
    @Query() sort: SortParams,
    @Query() search: SearchParams,
    @Query() filter: FilterParams,
    @Query() pagination: PaginationParams,
  ) {
    return await this.nftService.getNftsByUser(
      userId,
      sort,
      search,
      filter,
      pagination,
    );
  }

  @ApiOperation({ summary: 'Find all nfts by user token' })
  @ApiBody({ type: CreateNftDto })
  @UseGuards(AccessTokenGuard)
  @Post('user')
  async getNftsByUserToken(
    @CurrentUser() user: User,
    @Body() { sort, search, pagination, filter }: PaginationDto,
  ) {
    return await this.nftService.getNftsByUser(
      user.id,
      sort,
      search,
      filter,
      pagination,
    );
  }

  @ApiOperation({ summary: 'Find all nfts user owned' })
  @Public()
  @Get('owner/:userId')
  async getOwnedNfts(@Param('userId') userId: string) {
    return await this.nftService.getNfts({ where: { ownerId: userId } });
  }

  @ApiOperation({
    summary: 'Find all nfts user minted',
  })
  @Public()
  @Get('minter/:userId')
  async getCreatedNfts(@Param('userId') userId: string) {
    return await this.nftService.getNfts({ where: { minterId: userId } });
  }

  @ApiOperation({
    summary: 'Find nft',
  })
  @ApiBody({ type: GetNftDto })
  @Public()
  @Post('get')
  async getNft(@Body() data: GetNftDto) {
    return await this.nftService.getNft(data);
  }

  @ApiOperation({ summary: 'Create new nft', description: 'forbidden' })
  @ApiBody({ type: CreateNftDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createNft(
    @CurrentUser() user: User,
    @Body() createNftDto: CreateNftDto,
  ) {
    return await this.nftService.createNft(user.id, createNftDto);
  }
}
