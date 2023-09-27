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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const _logger = new Logger();
  const configService = app.get<ConfigService>(ConfigService<Config>);

  const redisService = app.get<RedisService>(RedisService);

  const prismaService = app.get<PrismaService>(PrismaService);
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
          windowMs: 15 * 60 * 1000, // 15 minutes
          max: 100, // limit each IP to 100 requests per windowMs
        }),
      );
    // .use(function (req, res, next) {
    // res.header(
    //   'Access-Control-Allow-Origin',
    //   configService.get('application.CLIENT_URL'),
    // );
    // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');

    // res.header(
    //   'Access-Control-Allow-Headers',
    //   'Origin, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept',
    // );
    // res.header(
    //   'Access-Control-Allow-Methods',
    //   'GET,POST,PUT,PATCH,DELETE, OPTIONS',
    // );
    // res.header('Access-Control-Allow-Credentials', true);
    //   if (req.method === 'OPTIONS') {
    //     return res.sendStatus(204);
    //   }
    //   next();
    // });
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
