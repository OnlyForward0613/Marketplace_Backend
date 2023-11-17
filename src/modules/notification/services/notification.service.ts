// notification.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { GeneratorService, Web3Service } from '@common/providers';
import { CreateNotificationDto } from '../dto/create-notification.dto';
import { UpdateNotificationsDto } from '../dto/read-notification.dto';

@Injectable()
export class NotificationService {
  private logger = new Logger(NotificationService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly generatorService: GeneratorService,
    private readonly web3Service: Web3Service,
  ) {}

  async getNotificationsByUser(userId: string) {
    return await this.prismaService.notification.findMany({
      where: {
        userId: userId,
        acknowledged: false,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        activity: {
          include: {
            nft: true,
          },
        },
      },
    });
  }

  async createNotification(userId: string, data: CreateNotificationDto) {
    const activity = await this.prismaService.activity.findUnique({
      where: {
        id: data.activityId,
      },
    });
    if (!activity)
      throw new HttpException(
        'Invalid activity id',
        HttpStatus.EXPECTATION_FAILED,
      );

    try {
      const newNotification = await this.prismaService.notification.create({
        data: {
          id: this.generatorService.uuid(),
          type: data.type,
          acknowledged: false,
          activity: {
            connect: {
              id: data.activityId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return newNotification;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async readNotification(userId: string, data: UpdateNotificationsDto) {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        id: {
          in: data.ids,
        },
      },
    });
    if (!notifications.length || notifications.length !== data.ids.length)
      throw new HttpException(
        'Invalid notification id',
        HttpStatus.EXPECTATION_FAILED,
      );

    for (let notification of notifications) {
      if (userId !== notification.userId)
        throw new HttpException(
          'Invalid user id',
          HttpStatus.EXPECTATION_FAILED,
        );
    }

    try {
      const updatedNotifications =
        await this.prismaService.notification.updateMany({
          where: {
            id: {
              in: data.ids,
            },
          },
          data: {
            acknowledged: true,
          },
        });

      return updatedNotifications;
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
