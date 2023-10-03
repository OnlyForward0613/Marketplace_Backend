import { StrategyToken } from '@common/guards/strategy.enum';
import { IPayloadUserJwt } from '@common/interfaces';
import { UserService } from '@modules/user/services';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException } from 'src/errors';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  StrategyToken.JWT,
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_PRIVATE_KEY,
    });
  }

  async validate({ walletAddress }: IPayloadUserJwt) {
    const user = await this.userService.getUser({
      where: { walletAddress },
      include: {
        profile: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('Unauthenticated');
    }
    if (!user.isActive) throw new ForbiddenException('User is not activated.');
    return user;
  }
}
