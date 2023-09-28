import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
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

  @UseGuards(AccessTokenGuard)
  @Get()
  async getProfile(@CurrentUser() actor: User) {
    return this.profileService.getProfile(actor.id);
  }
}
