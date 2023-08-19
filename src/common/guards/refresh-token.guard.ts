import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyToken } from './strategy.enum';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(
  StrategyToken.JWT_REFRESH_TOKEN,
) {
  constructor() {
    super();
  }
  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments\
    if (err || !user) {
      throw new UnauthorizedException('refresh_token');
    }
    return user;
  }
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
