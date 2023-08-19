import { NestFactory } from '@nestjs/core';

import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';

import { Logger } from './common';
import { Config } from './config';
import { PrismaService } from '@prisma/prisma.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const _logger = new Logger();
  const configService = app.get<ConfigService>(ConfigService<Config>);
  const prismaService = app.get<PrismaService>(PrismaService);
  app.setGlobalPrefix('api', {
    exclude: ['/'],
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useLogger(await app.resolve(Logger));
  const isProd = configService.get('application.isProd');
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: false,
      transform: true,
      validationError: {
        target: false,
      },
    }),
  );
  const port = configService.get('application.PORT');

  await app.listen(port, () => {
    console.log(`app is running on port ${port}`);
  });

  return app.getUrl();
}
bootstrap();
