import { Request } from 'express';

export interface InkRequestInterface extends Request {
  id: string;
}
