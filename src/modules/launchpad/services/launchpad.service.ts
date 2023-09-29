// launchpad.service.ts

import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Prisma, Launchpad, LaunchpadStatus } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import {
  GeneratorService,
  MerkleService,
  Web3Service,
} from '@common/providers';
import { CreateLaunchpadDto } from '../dto/create-launchpad.dto';

@Injectable()
export class LaunchpadService {
  private logger = new Logger(LaunchpadService.name);
  constructor(
    private readonly web3Service: Web3Service,
    private readonly merkleService: MerkleService,
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
    const launchpad = await this.prismaService.launchpad.create({
      data: {
        ...data,
        logoId: undefined,
        imageId: undefined,
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

    this.logger.log(`applying to deploy new launchpad ${launchpad.id}`);

    try {
      const user = await this.prismaService.user.findUnique({
        where: { id: userId },
      });

      if (!user)
        throw new HttpException(
          'User does not exist',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const merkleRoot = this.merkleService
        .formMerkleTree(launchpad.wlAddresses, 'sha256')
        .getHexRoot();
      this.logger.log(`new merkleroot ${merkleRoot} is generated`);

      const collectionAddress = await this.web3Service.deployCollection(
        launchpad.network,
        {
          maxSupply: launchpad.supply,
          mintPrice: launchpad.mintPrice,
          startTime: launchpad.startDate.getTime() / 1000,
          endTime: launchpad.endDate.getTime() / 1000,
          maxMintAmount: launchpad.maxPerTx,
          maxWalletAmount: launchpad.maxPerWallet,
          creator: user.walletAddress,
          name: launchpad.name,
          symbol: launchpad.symbol,
          baseURI: launchpad.collectionUri,
          merkleRoot: merkleRoot,
        },
      );

      if (!collectionAddress) {
        throw new HttpException(
          'Collection deploy was failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.prismaService.launchpad.update({
        data: {
          status: LaunchpadStatus.PUBLISHED,
        },
        where: {
          id: launchpad.id,
        },
      });

      await this.prismaService.collection.create({
        data: {
          id: this.generatorService.uuid(),
          name: launchpad.name,
          address: collectionAddress,
          avatarId: launchpad.logoId,
          bannerId: launchpad.imageId,
          desc: launchpad.desc,
          twitter: launchpad.twitter,
          discord: launchpad.discord,
          network: launchpad.network,
          creatorId: launchpad.creatorId,
          launchpadId: launchpad.id,
          verified: true,
        },
      });

      return launchpad;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateLaunchpad(
    userId: string,
    args: Prisma.LaunchpadUpdateArgs,
  ): Promise<Launchpad> {
    this.logger.log(`User ${userId} is trying to update launchpad`);
    try {
      const launchpad = await this.checkLaunchpad(args.where);
      this.checkCreator(launchpad, userId);

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
      const launchpad = await this.checkLaunchpad(args.where);
      this.checkCreator(launchpad, userId);

      return await this.prismaService.launchpad.delete({ ...args });
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async applyLaunchpad(id: string) {
    this.logger.log(`applying to deploy new launchpad ${id}`);
    try {
      const launchpad = await this.checkLaunchpad({ id });
      const user = await this.prismaService.user.findUnique({
        where: { id: launchpad.creatorId },
      });

      if (!user)
        throw new HttpException(
          'User does not exist',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      const merkleRoot = this.merkleService
        .formMerkleTree(launchpad.wlAddresses, 'sha256')
        .getHexRoot();
      this.logger.log(`new merkleroot ${merkleRoot} is generated`);

      const collectionAddress = await this.web3Service.deployCollection(
        launchpad.network,
        {
          maxSupply: launchpad.supply,
          mintPrice: launchpad.mintPrice,
          startTime: launchpad.startDate.getTime(),
          endTime: launchpad.endDate.getTime(),
          maxMintAmount: launchpad.maxPerTx,
          maxWalletAmount: launchpad.maxPerWallet,
          creator: user.walletAddress,
          name: launchpad.name,
          symbol: launchpad.symbol,
          baseURI: launchpad.collectionUri,
          merkleRoot: merkleRoot,
        },
      );
      if (!collectionAddress) {
        throw new HttpException(
          'Collection deploy was failed',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      await this.prismaService.launchpad.update({
        data: {
          status: LaunchpadStatus.PUBLISHED,
        },
        where: {
          id,
        },
      });

      const collection = await this.prismaService.collection.create({
        data: {
          id: this.generatorService.uuid(),
          name: launchpad.name,
          address: collectionAddress,
          avatarId: launchpad.logoId,
          bannerId: launchpad.imageId,
          desc: launchpad.desc,
          twitter: launchpad.twitter,
          discord: launchpad.discord,
          network: launchpad.network,
          creatorId: launchpad.creatorId,
          launchpadId: launchpad.id,
          verified: true,
        },
      });

      return collection;
    } catch (e) {
      this.logger.error(e);
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async checkLaunchpad(where: Prisma.LaunchpadWhereUniqueInput) {
    const launchpad = await this.prismaService.launchpad.findUnique({
      where,
    });
    if (!launchpad)
      throw new HttpException('Invalid launchpad id', HttpStatus.BAD_REQUEST);
    return launchpad;
  }

  async checkCreator(launchpad: Launchpad, userId: string) {
    if (launchpad.creatorId !== userId)
      throw new HttpException('Invalid creator id', HttpStatus.NOT_ACCEPTABLE);
  }
}
