import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InkRequestInterface } from 'src/@types/ink-request.interface';
import { GeneratorService } from '..';

@Injectable()
export class InkRequestMiddleware implements NestMiddleware {
  constructor(private readonly generateService: GeneratorService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const generatedId = this.generateService.uuid();
    // Add the ID to the request object
    (req as InkRequestInterface).id = generatedId;
    next();
  }
}
