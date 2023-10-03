import { Request, Response } from 'express';

export interface IRequestWithUser extends Request {
  user: IUserFromRequest;
  res?: Response;
}

export interface IUserFromRequest {
  id: string;
  walletAddress: string;
}
