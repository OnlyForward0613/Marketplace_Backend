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
  async signIn(@Body() data: UserSigninDto): Promise<any> {
    return await this.authService.signIn(data);
  }

  @ApiOperation({ summary: 'Sign out' })
  @Post('signout')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async signout(
    @Request() req: IRequestWithUser,
  ): Promise<{ message: string }> {
    await this.authService.signout(req.user.id);

    return { message: 'success' };
  }

  @ApiOperation({ summary: 'Refresh token' })
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(@Request() req: IRequestWithUser): Promise<any> {
    const { user } = req;
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    const payload: IPayloadUserJwt = {
      id: user.id,
      walletAddress: user.walletAddress,
    };
    const authToken = await this.authService.refreshTokens(
      payload,
      refreshToken,
    );

    return authToken;
  }

  @ApiOperation({ summary: 'Validate token' })
  @Post('validate')
  @UseGuards(AccessTokenGuard)
  @HttpCode(HttpStatus.OK)
  async validateToken(@CurrentUser() user: User): Promise<User> {
    if (!user) throw new ForbiddenException('Unauthorized');
    await this.authService.validateAccessToken(user.id);
    return user;
  }
}
