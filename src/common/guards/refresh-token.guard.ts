import {
  ExecutionContext,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyToken } from './strategy.enum';

@Injectable()
export class RefreshTokenGuard extends AuthGuard(StrategyToken.JWT_REFRESH) {
  private readonly logger = new Logger(RefreshTokenGuard.name);
  constructor() {
    super();
  }
  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    // You can throw an exception based on either "info" or "err" arguments\
    if (err || !user) {
      this.logger.error(info);
      throw new NotFoundException('Token is invalid');
    }
    return user;
  }
  getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
  }
}
