import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { StrategyToken } from '@common/guards/strategy.enum';
import { IPayloadUserJwt, IRequestWithUser } from '@common/interfaces';
import { AuthService } from '../services';
import { ForbiddenException } from 'src/errors';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  StrategyToken.JWT_REFRESH_TOKEN,
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => req?.session?.authToken?.refreshToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_REFRESH_PRIVATE_KEY,
      passReqToCallback: true,
    });
  }

  public async validate(req: IRequestWithUser, { id }: IPayloadUserJwt) {
    const authToken = req.session?.authToken;
    if (!authToken.refreshToken) {
      throw new BadRequestException('invalid refresh token');
    }
    const user = await this.authService.validateRefreshToken(
      id,
      authToken.refreshToken,
      authToken.refreshTokenId,
    );
    if (!user) {
      throw new BadRequestException('token expired');
    }
    if (!user.isActive) throw new ForbiddenException('user is not activated.');
    return user;
  }
}
