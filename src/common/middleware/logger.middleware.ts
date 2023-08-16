import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response } from 'express';
import { nanoid } from 'nanoid';

import { Logger } from '../logger';
import { InkRequestInterface } from 'src/@types/ink-request.interface';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: Logger) {}

  public use(req: InkRequestInterface, res: Response, next: () => void): void {
    req.id = req.header('X-Request-Id') || nanoid();
    res.setHeader('X-Request-Id', req.id);
    Logger.setMetadata({ id: req.id });
    const userAgent = req.get('user-agent') || '';
    const referer = req.get('referer') || '';

    res.on('finish', () => {
      const { statusCode } = res;
      this.logger.log(
        `${req.method} ${
          req.originalUrl
        } ${statusCode} - ${userAgent} ${referer} - ${req.ip.replace(
          '::ffff:',
          '',
        )}`,
      );
    });
    return next();
  }
}
