import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { RouterModule } from '@nestjs/core';
import { configuration } from './config';
import { HealthModule } from './health';
import { PrismaModule } from './prisma';
import { CommonModule } from './common';
import { LoggerMiddleware } from '@common/middleware';
import { InkRequestMiddleware } from '@common/middleware/ink-request.middleware';
import { MarketplaceModule } from '@modules/marketplace';
import { LaunchpadModule } from '@modules/launchpad';
import { SeaportModule } from './seaport';
import { RedisModule } from '@redis/redis.module';
import { AuthModule } from '@modules/auth';
import { UserModule } from '@modules/user';
import { CollectionModule } from '@modules/collection';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    RouterModule.register([
      {
        path: 'marketplace',
        module: MarketplaceModule,
      },
      {
        path: 'collection',
        module: CollectionModule,
      },
      {
        path: 'launchpad',
        module: LaunchpadModule,
      },

      {
        path: 'user',
        module: UserModule,
      },
    ]),

    HealthModule,
    CommonModule,
    PrismaModule,
    SeaportModule,
    AuthModule,
    UserModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware, InkRequestMiddleware).forRoutes('*');
  }
}
