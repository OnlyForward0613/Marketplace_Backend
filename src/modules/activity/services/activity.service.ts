// activity.service.ts

import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActivities(args: Prisma.ActivityFindManyArgs) {
    return await this.prismaService.activity.findMany({
      ...args,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        nft: true,
        seller: {
          include: {
            profile: {
              include: {
                avatar: true,
              },
            },
          },
        },
        buyer: {
          include: {
            profile: {
              include: {
                avatar: true,
              },
            },
          },
        },
      },
    });
  }
}
