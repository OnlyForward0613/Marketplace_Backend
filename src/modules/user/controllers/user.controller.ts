import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { IPayloadUserJwt } from '@common/interfaces';
import { UpdateUsernameDto } from '@modules/user/dto/update-username.dto';
import { UserService } from '@modules/user/services/user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';

@Controller({
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AccessTokenGuard)
  @Patch('update-username')
  async updateUsername(
    @CurrentUser() payload: IPayloadUserJwt,
    @Body() usernameDto: UpdateUsernameDto,
  ) {
    return this.userService.updateUsername(payload, usernameDto);
  }

  @UseGuards(AccessTokenGuard)
  @Post('available-username')
  async availableUsername(
    @CurrentUser() payload: IPayloadUserJwt,
    @Body() usernameDto: UpdateUsernameDto,
  ) {
    return this.userService.availableUsername(payload, usernameDto);
  }
}
