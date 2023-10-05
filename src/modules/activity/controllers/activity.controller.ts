import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { User } from '@prisma/client';
import { ActivityService } from '../services/activity.service';
// import { CreateActivityDto } from '../dto/create-activity.dto';

const moduleName = 'activity';

@ApiTags(moduleName)
@Controller(moduleName)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @ApiOperation({ summary: 'Get activities by user', description: '' })
  @UseGuards(AccessTokenGuard)
  @Get('user')
  async getUserActivities(@CurrentUser() actor: User) {
    return this.activityService.getActivitiesByUserId(actor.id);
  }

  @ApiOperation({ summary: 'Get activities of collection', description: '' })
  @Public()
  @Get('collection/:collectionId')
  async getCollectionActivities(@Param('collectionId') collectionId: string) {
    return this.activityService.getActivitiesByCollectionId(collectionId);
  }

  @ApiOperation({ summary: 'Get activities of NFT', description: '' })
  @Public()
  @Get('nft/:nftId')
  async getNftActivities(@Param('nftId') nftId: string) {
    return this.activityService.getActivityByNftId(nftId);
  }

  // @ApiOperation({ summary: 'Create activity', description: '' })
  // @UseGuards(AccessTokenGuard)
  // @Post()
  // async postActivity(@CurrentUser() actor: User, @Body() data: CreateActivityDto) {
  //   return this.activityService.createInitialActivity(actor.id, data);
  // }
}
