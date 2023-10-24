// profile.controller.ts

import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { User } from '@prisma/client';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../services';

const moduleName = 'profile';

@ApiTags(moduleName)
@Controller(moduleName)
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @ApiOperation({ summary: 'Update user profile' })
  @ApiBody({ type: UpdateProfileDto })
  @UseGuards(AccessTokenGuard)
  @Patch()
  async updateProfile(
    @CurrentUser() user: User,
    @Body() profileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(user.id, profileDto);
  }

  @ApiOperation({ summary: 'Get profile', description: 'forbidden' })
  @UseGuards(AccessTokenGuard)
  @Get()
  async getProfile(@CurrentUser() user: User) {
    return this.profileService.getProfile({
      where: { userId: user.id },
      include: {
        avatar: true,
        banner: true,
      },
    });
  }

  @ApiOperation({ summary: 'Get profile by id' })
  @Public()
  @Get(':userId')
  async getProfileById(@Param('userId') userId: string) {
    return this.profileService.getProfile({
      where: { userId },
      include: {
        avatar: true,
        banner: true,
      },
    });
  }
}
