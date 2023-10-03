import {
  ExecutionContext,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { PUBLIC_ROUTE_KEY } from '@common/decorators';
import { ForbiddenException } from 'src/errors';
import { StrategyToken } from './strategy.enum';

@Injectable()
export class AccessTokenGuard extends AuthGuard(StrategyToken.JWT) {
  private readonly logger = new Logger(AccessTokenGuard.name);
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_ROUTE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const result = super.canActivate(context) as boolean;
    if (!result) {
      throw new ForbiddenException('Authorization failed.');
    }
    return result;
  }

  handleRequest<TUser = any>(err: any, user: any, info: any): TUser {
    if (err || !user) {
      this.logger.error(info);
      throw err || new ForbiddenException(err);
    }
    return user;
  }
}
