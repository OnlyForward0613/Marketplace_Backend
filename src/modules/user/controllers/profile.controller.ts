import { CurrentUser } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../services';

@Controller({ version: '1' })
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseGuards(AccessTokenGuard)
  @Patch('update-profile')
  async updateProfile(
    @CurrentUser() actor: User,
    @Body() profileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(actor, profileDto);
  }


  @UseGuards(AccessTokenGuard)
  @Get('me')
  async getProfile(@CurrentUser() actor: User) {
    return this.profileService.getProfile(actor.id);
  }
  // @UseGuards(AccessTokenGuard)
  // @Put('avatar')
  // @UseInterceptors(FileInterceptor('file'))
  // async createAvatar(
  //   @CurrentUser() actor: User,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.profileService.createAvatar(actor, file);
  // }
}
