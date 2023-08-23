import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '@modules/user';
import { UserService } from '@modules/user/services/user.service';

import { AuthController } from './controller/auth.controller';
import { AuthService, TokenService } from './services';
import { JwtRefreshTokenStrategy, JwtStrategy } from './strategies';

import { RedisModule } from '@redis/redis.module';
import { RedisService } from '@redis/redis.service';

const providers = [
  AuthService,
  UserService,
  TokenService,
  JwtRefreshTokenStrategy,
  JwtStrategy,
  RedisService,
];

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({
      session: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        privateKey: configService.get('secrets.JWT_PRIVATE_KEY'),
        publicKey: configService.get('secrets.JWT_PUBLIC_KEY'),
        signOptions: {
          expiresIn: configService.get('secrets.JWT_EXPIRE_TIME'),
          algorithm: configService.get('secrets.JWT_ALGORITHM'),
        },
      }),
    }),
    RedisModule,
  ],
  providers,
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
