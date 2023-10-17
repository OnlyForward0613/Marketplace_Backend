import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { PrismaService } from '@prisma/prisma.service';
import { RedisService } from '@redis/redis.service';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';
import RateLimit from 'express-rate-limit';
import { sessionConfig } from '@redis/redis.config';
import { AppModule } from './app.module';
import { Logger } from './common';
import { Config } from './config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const _logger = new Logger();
  const configService = app.get<ConfigService>(ConfigService<Config>);

  const redisService = app.get<RedisService>(RedisService);

  // const prismaService = app.get<PrismaService>(PrismaService);
  const sessionValue = configService.get('secrets.SESSION_SECRET');
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser(sessionValue));
  app.enableCors({
    origin: [
      configService.get('application.CLIENT_URL'),
      'http://localhost:3000',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  });
  redisService.client.on('ready', () => {
    _logger.log(`Redis client is ${redisService.client.status}`);
  });

  const isProd = configService.get('application.isProd');
  _logger.log({ isProd });
  // session
  const sessionOptions = sessionConfig(
    redisService.client,
    sessionValue,
    isProd,
  );
  app.use(session(sessionOptions));
  // init passport
  app.use(passport.initialize());
  app.use(passport.session());
  if (isProd) {
    app.set('trust proxy', 1); // trust first cookie
    app
      .use(compression())
      .use(helmet())
      .use(
        RateLimit({
          windowMs: 1 * 60 * 1000, // 1 minutes
          max: 1000, // limit each IP to 1000 requests per windowMs
        }),
      );
  }
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('Inkubate')
    .setDescription('nft marketplace api on ethereum')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = configService.get('application.PORT');

  await app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });

  return app.getUrl();
}
bootstrap();
