import { PUBLIC_ROUTE_KEY } from '@common/decorators';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ForbiddenException } from 'src/errors';
import { StrategyToken } from './strategy.enum';

@Injectable()
export class AccessTokenGuard extends AuthGuard(StrategyToken.JWT) {
  constructor(private reflector: Reflector) {
    super();
  }
  handleRequest(err, user) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      console.log('err', err);
      console.log('user', user);
      throw new ForbiddenException('access_token');
    }
    return user;
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(PUBLIC_ROUTE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    return super.canActivate(context);
  }
}
