import { IPayloadUserJwt } from '@common/interfaces';
import { UserService } from '@modules/user/services/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ForbiddenException } from '../../../errors';

@Injectable()
export class JwtCustomStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: any) => req?.session?.authToken?.accessToken,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_PRIVATE_KEY,
    });
  }

  public async validate({ walletAddress }: IPayloadUserJwt) {
    const user = await this.userService.getUser({
      where: { walletAddress },
      include: {
        profile: true,
      },
    });
    if (!user) {
      throw new ForbiddenException('unauthenticated');
    }
    if (!user.isActive) throw new ForbiddenException('user is not activated.');
    return user;
  }
}
