// launchpad.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, Launchpad } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { GeneratorService } from '@common/providers';

@Injectable()
export class LaunchpadService {
  private logger = new Logger(LaunchpadService.name);
  constructor(
    // private readonly web3Service: Web3Service,
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getLaunchpads(args: Prisma.LaunchpadFindManyArgs) {
    return await this.prismaService.launchpad.findMany({ ...args });
  }
  public async getLaunchpad(
    args: Prisma.LaunchpadFindUniqueArgs,
  ): Promise<Launchpad> {
    return await this.prismaService.launchpad.findUnique({ ...args });
  }
  async createLaunchpad(
    userId: string,
    data: Omit<
      Prisma.LaunchpadCreateInput,
      'id' | 'imageUrl' | 'coverUrl' | 'logoUrl' | 'status' | 'User'
    >,
  ): Promise<Launchpad> {
    this.logger.log(`User ${userId} is trying to create new launchpad`);
    return await this.prismaService.launchpad.create({
      data: {
        ...data,
        imageUrl: 'no-image',
        coverUrl: 'no-image',
        logoUrl: 'no-image',
        status: 'pending',
        id: this.generatorService.uuid(),
        User: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
  async updateLaunchpad(
    userId: string,
    args: Prisma.LaunchpadUpdateArgs,
  ): Promise<Launchpad> {
    this.logger.log(`User ${userId} is trying to update launchpad`);
    try {
      this.checkIds(args.where, userId);
      return await this.prismaService.launchpad.update({
        ...args,
      });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async deleteLaunchpad(
    userId: string,
    args: Prisma.LaunchpadDeleteArgs,
  ): Promise<Launchpad> {
    this.logger.log(`User ${userId} is trying to delete launchpad`);
    try {
      this.checkIds(args.where, userId);
      return await this.prismaService.launchpad.delete({ ...args });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async checkIds(where: Prisma.LaunchpadWhereUniqueInput, userId: string) {
    const launchpad = await this.prismaService.launchpad.findUnique({
      where,
    });
    if (!launchpad)
      throw new HttpException('Invalid user id', HttpStatus.BAD_REQUEST);
    else {
      if (launchpad.userId !== userId)
        throw new HttpException('Invalid owner', HttpStatus.NOT_ACCEPTABLE);
      else return;
    }
  }
}
