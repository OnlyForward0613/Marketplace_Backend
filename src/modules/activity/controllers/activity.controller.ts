// activity.controller.ts

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { ActivityType, User } from '@prisma/client';
import { ActivityService } from '../services/activity.service';

const moduleName = 'activity';

@ApiTags(moduleName)
@Controller(moduleName)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiOperation({ summary: 'Get activities by user', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Get('user')
  async getUserActivities(@CurrentUser() user: User) {
    return await this.activityService.getActivities({
      where: {
        OR: [{ sellerId: user.id }, { buyerId: user.id }],
      },
    });
  }

  @ApiOperation({
    summary: 'Get activities of collection',
    description: 'public',
  })
  @Public()
  @Get('collection/:collectionId')
  async getCollectionActivities(@Param('collectionId') collectionId: string) {
    return await this.activityService.getActivities({
      where: {
        nft: {
          collectionId,
        },
        OR: [
          { actionType: ActivityType.SOLD },
          { actionType: ActivityType.ACCPETED_OFFER },
        ],
      },
    });
  }

  @ApiOperation({ summary: 'Get activities of NFT', description: 'public' })
  @Public()
  @Get('nft/:nftId')
  async getNftActivities(@Param('nftId') nftId: string) {
    return await this.activityService.getActivities({
      where: {
        nftId,
      },
    });
  }
}
