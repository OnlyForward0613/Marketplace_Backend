import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { UpdateProfileDto } from '../dto/update-profile.dto';
import { ProfileService } from '../services';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

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
