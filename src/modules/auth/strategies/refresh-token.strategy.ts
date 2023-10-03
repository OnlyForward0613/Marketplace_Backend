import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthService } from '../services';
import { StrategyToken } from '@common/guards/strategy.enum';
import { ForbiddenException } from 'src/errors';
import { IPayloadUserJwt, IRequestWithUser } from '@common/interfaces';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  StrategyToken.JWT_REFRESH,
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_REFRESH_PRIVATE_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: IRequestWithUser, { id }: IPayloadUserJwt) {
    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
    if (!refreshToken) {
      throw new BadRequestException('Invalid refresh token');
    }
    const user = await this.authService.validateRefreshToken(id, refreshToken);
    if (!user) {
      throw new BadRequestException('Token expired');
    }
    if (!user.isActive) throw new ForbiddenException('User is not activated.');
    return user;
  }
}
