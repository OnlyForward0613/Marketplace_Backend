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
        path: 'launchpad',
        module: LaunchpadModule,
      },
    ]),

    HealthModule,
    CommonModule,
    PrismaModule,
    SeaportModule
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
