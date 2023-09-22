import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from '@common/guards';
import {
  IPayloadUserJwt,
  IRequestWithUser,
  ISessionAuthToken,
} from '@common/interfaces';
import { GeneratorService } from '@common/providers';
import { UserSignInDto } from '@modules/auth/dto/user-connect.dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import Prisma, { User } from '@prisma/client';
import { ForbiddenException } from '../../../errors';
import { AuthService } from '../services';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private generatorService: GeneratorService,
  ) {}

  @Public()
  @Post('nonce')
  @HttpCode(HttpStatus.OK)
  async nonce(
    @Body() data: { walletAddress: string },
    @Request() req: Request,
  ) {
    return this.authService.generateNonce(data);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: UserSignInDto, @Request() req: IRequestWithUser) {
    const refreshTokenId = this.generatorService.createRefreshTokenId();
    const { accessToken, refreshToken } = await this.authService.signIn(
      data,
      refreshTokenId,
    );
    req.session.authToken = { accessToken, refreshToken, refreshTokenId };
    return { accessToken };
  }
  @Post('signout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async signout(
    @Request() req: IRequestWithUser,
  ): Promise<{ message: string }> {
    const userId = req.user.id;
    const sessionAuthToken = req.session.authToken;
    await this.authService.signout(userId, sessionAuthToken);
    req.session.authToken = undefined;
    return { message: 'success' };
  }

  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Request() req: IRequestWithUser): Promise<string> {
    const { user } = req;
    const payload: IPayloadUserJwt = {
      id: user.id,
      walletAddress: user.walletAddress,
    };
    const sessionAuthToken = req.session?.authToken;
    const refreshTokenId = this.generatorService.createRefreshTokenId();
    const { accessToken, refreshToken } = await this.authService.refreshTokens(
      payload,
      sessionAuthToken,
      refreshTokenId,
    );
    req.session.authToken = {
      accessToken,
      refreshToken,
      refreshTokenId,
    };
    return accessToken;
  }

  @Post('validate-tokens')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async validateTokens(
    @Request() req: IRequestWithUser,
    @CurrentUser() user: User,
  ): Promise<User> {
    if (!user) throw new ForbiddenException('unauthorized');
    const authTokens: ISessionAuthToken = req.session.authToken;
    await this.authService.validateRefreshToken(
      user.id,
      authTokens.refreshToken,
      authTokens.refreshTokenId,
    );
    return user;
  }
}
