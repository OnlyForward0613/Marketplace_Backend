import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LoggerMiddleware } from '@common/middleware';
import { InkRequestMiddleware } from '@common/middleware/ink-request.middleware';
import { AuthModule } from '@modules/auth';
import { CollectionModule } from '@modules/collection';
import { LaunchpadModule } from '@modules/launchpad';
import { ListingModule } from '@modules/listing';
import { UserModule } from '@modules/user';
import { RouterModule } from '@nestjs/core';
import { RedisModule } from '@redis/redis.module';
import { CommonModule } from './common';
import { configuration } from './config';
import { HealthModule } from './health';
import { PrismaModule } from './prisma';
import { OfferModule } from '@modules/offer';
import { MarketplaceModule } from '@modules/marketplace';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HealthModule,
    CommonModule,
    PrismaModule,
    AuthModule,
    UserModule,
    RedisModule,
    ListingModule,
    OfferModule,
    LaunchpadModule,
    MarketplaceModule,
    CollectionModule,
  ],
})
export class AppModule implements NestModule {
  // Global Middleware, Inbound logging
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware, InkRequestMiddleware).forRoutes('*');
  }
}
