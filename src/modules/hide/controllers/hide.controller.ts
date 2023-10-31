// hide.controller.ts

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
import { FilterParams } from '@common/dto/filter-params.dto';
import { PaginationParams } from '@common/dto/pagenation-params.dto';
import { CreateHideDto } from '../dto/create-hide.dto';
import { HideService } from '../services/hide.service';

const moduleName = 'hide';

@ApiTags(moduleName)
@Controller(moduleName)
export class HideController {
  constructor(private hideService: HideService) {}

  @ApiOperation({ summary: 'Get hides by user', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Get()
  async getHidesByUser(
    @CurrentUser() user: User,
    @Query() filter: FilterParams,
    @Query() pagination: PaginationParams,
  ) {
    return await this.hideService.getHidesByUser(user.id, filter, pagination);
  }

  @ApiOperation({ summary: 'Create new hide', description: 'forbidden' })
  @ApiBody({ type: CreateHideDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  async createHide(
    @CurrentUser() user: User,
    @Body() { nftId }: CreateHideDto,
  ) {
    return await this.hideService.createHide(user.id, nftId);
  }

  @ApiOperation({ summary: 'Delete hide', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Delete(':id')
  async deleteHide(@Param('id') id: string, @CurrentUser() user: User) {
    return await this.hideService.deleteHide(id, user.id);
  }
}
