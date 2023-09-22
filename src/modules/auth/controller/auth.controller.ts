import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser, Public } from '@common/decorators';
import { AccessTokenGuard, RefreshTokenGuard } from '@common/guards';
import {
  IPayloadUserJwt,
  IRequestWithUser,
  ISessionAuthToken,
} from '@common/interfaces';
import { UserSigninDto } from '@modules/auth/dto/signin.dto';
import { User } from '@prisma/client';
import { ForbiddenException } from '../../../errors';
import { AuthService } from '../services';
import { SignupDto } from '../dto/signup.dto';

const moduleName = 'auth';

@ApiTags(moduleName)
@Controller(moduleName)
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up' })
  @ApiBody({ type: SignupDto })
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() signupDto: SignupDto) {
    return this.authService.signUp(signupDto);
  }

  @ApiOperation({ summary: 'Sign in' })
  @ApiBody({ type: UserSigninDto })
  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() data: UserSigninDto,
    @Request() req: IRequestWithUser,
  ): Promise<string> {
    const authToken = await this.authService.signIn(data);

    req.session.authToken = authToken;

    return authToken.accessToken;
  }

  @ApiOperation({ summary: 'Sign out' })
  @Public()
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

  @ApiOperation({ summary: 'Refresh token' })
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
    const authToken = await this.authService.refreshTokens(
      payload,
      sessionAuthToken,
    );

    req.session.authToken = authToken;

    return authToken.accessToken;
  }

  @ApiOperation({ summary: 'Validate token' })
  @Post('validate')
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
