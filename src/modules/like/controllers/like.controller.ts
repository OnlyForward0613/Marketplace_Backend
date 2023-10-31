// like.controller.ts

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { CreateLikeDto } from '../dto/create-like.dto';
import { LikeService } from '../services/like.service';
import { FilterParams } from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';

const moduleName = 'like';

@ApiTags(moduleName)
@Controller(moduleName)
export class LikeController {
  constructor(private likeService: LikeService) {}

  @ApiOperation({ summary: 'Get likes by user', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Get()
  async getLikesByUser(
    @CurrentUser() user: User,
    @Query() filter: FilterParams,
    @Query() pagination: PaginationParams,
  ) {
    return await this.likeService.getLikesByUser(user.id, filter, pagination);
  }

  @ApiOperation({
    summary: 'Get like by user and nftId',
    description: 'forbidden',
  })
  @UseGuards(AccessTokenGuard)
  @Get(':nftId')
  async getLikeByUser(
    @Param('nftId') nftId: string,
    @CurrentUser() user: User,
  ) {
    return await this.likeService.getLikeByUser(user.id, nftId);
  }

  @ApiOperation({ summary: 'Create new like', description: 'forbidden' })
  @ApiBody({ type: CreateLikeDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createLike(
    @CurrentUser() user: User,
    @Body() { nftId }: CreateLikeDto,
  ) {
    return await this.likeService.createLike(user.id, nftId);
  }

  @ApiOperation({ summary: 'Delete launchpad', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteLike(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.likeService.deleteLike(id, user.id);
  }
}
