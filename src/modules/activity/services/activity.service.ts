import { Injectable } from '@nestjs/common';
import { ActivityType } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class ActivityService {
  constructor(private readonly prismaService: PrismaService) {}

  async getActivitiesByUserId(userId: string) {
    return this.prismaService.activity.findMany({
      where: {
        OR: [{ sellerId: userId }, { buyerId: userId }],
      },
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
  // Get only sales activity for collection activity endpoint
  async getActivitiesByCollectionId(collectionId: string) {
    return this.prismaService.activity.findMany({
      where: {
        nft: {
          collectionId,
        },
        OR: [
          { actionType: ActivityType.SOLD },
          { actionType: ActivityType.ACCPETED_OFFER },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        nft: {
          include: {
            collection: true,
          },
        },
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
  async getActivityByNftId(nftId: string) {
    return this.prismaService.activity.findMany({
      where: {
        nftId,
      },
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
