import Prisma from '@prisma/client';

export interface IPayloadUserJwt {
  id: string;
  walletAddress: string;
}
