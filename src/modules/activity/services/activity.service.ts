import { GeneratorService } from '@common/providers';
import { Injectable } from '@nestjs/common';
import { ActivityType } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { CreateActivityDto } from '../dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generatorService: GeneratorService,
  ) {}

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
  async getActivitiesByCollectionId(collectionId: string) {
    return this.prismaService.activity.findMany({
      where: {
        nft: {
          collectionId,
        },
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
  // async createInitialActivity(userId: string, activityData: CreateActivityDto) {
  //   return this.prismaService.activity.create({
  //     data: {
  //       id: this.generatorService.uuid(),
  //       status: ActivityType.SOLD,
  //       sellerId: userId,
  //       ...activityData,
  //     },
  //   });
  // }
}
