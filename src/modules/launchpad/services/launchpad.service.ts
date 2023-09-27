// launchpad.service.ts

import { GeneratorService } from '@common/providers';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, Launchpad, LaunchpadStatus } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';

import { CreateLaunchpadDto } from '../dto/create-launchpad.dto';

@Injectable()
export class LaunchpadService {
  private logger = new Logger(LaunchpadService.name);
  constructor(
    // private readonly web3Service: Web3Service,
    private readonly prismaService: PrismaService,
    private generatorService: GeneratorService,
  ) {}

  async getLaunchpads(args: Prisma.LaunchpadFindManyArgs) {
    return await this.prismaService.launchpad.findMany({
      include: { image: true, logoImg: true, creator: true },
      ...args,
    });
  }
  public async getLaunchpad(
    args: Prisma.LaunchpadFindUniqueArgs,
  ): Promise<Launchpad> {
    return await this.prismaService.launchpad.findUnique({
      include: { image: true, logoImg: true, creator: true },
      ...args,
    });
  }

  async createLaunchpad(
    userId: string,
    data: CreateLaunchpadDto,
  ): Promise<Launchpad> {
    this.logger.log(`User ${userId} is trying to create new launchpad`);
    return await this.prismaService.launchpad.create({
      data: {
        ...data,
        creatorId: undefined,
        id: this.generatorService.uuid(),
        status: LaunchpadStatus.APPLIED,
        creator: {
          connect: {
            id: userId,
          },
        },
        logoImg: data.logoId
          ? {
              connect: {
                id: data.logoId,
              },
            }
          : undefined,
        image: data.imageId
          ? {
              connect: {
                id: data.imageId,
              },
            }
          : undefined,
      } as Omit<
        Prisma.LaunchpadCreateInput,
        'creatorId' | 'logoId' | 'imageId'
      >,
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
      if (launchpad.creatorId !== userId)
        throw new HttpException('Invalid owner', HttpStatus.NOT_ACCEPTABLE);
      else return;
    }
  }
}
