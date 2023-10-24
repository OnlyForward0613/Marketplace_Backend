// profile.service.ts

import { Injectable, Logger } from '@nestjs/common';
import { GeneratorService } from '@common/providers';
import { UpdateProfileDto } from '@modules/user/dto/update-profile.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from './user.service';

@Injectable()
export class ProfileService {
  private logger = new Logger(ProfileService.name);
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private generatorService: GeneratorService,
  ) {}

  public async updateProfile(userId: string, profileDto: UpdateProfileDto) {
    this.logger.log(
      `${'*'.repeat(20)} updateProfile(${userId}) ${'*'.repeat(20)}`,
    );
    const profile = await this.prismaService.profile.findUnique({
      where: { userId },
    });

    if (profile)
      return await this.prismaService.profile.update({
        where: { userId: userId },
        data: profileDto,
      });
    else
      await this.prismaService.profile.create({
        data: {
          ...profileDto,
          id: this.generatorService.uuid(),
          userId: undefined,
          avatarId: undefined,
          bannerId: undefined,
          user: {
            connect: {
              id: userId,
            },
          },
          avatar: profileDto.avatarId
            ? {
                connect: {
                  id: profileDto.avatarId,
                },
              }
            : undefined,
          banner: profileDto.bannerId
            ? {
                connect: {
                  id: profileDto.bannerId,
                },
              }
            : undefined,
        } as Omit<
          Prisma.ProfileCreateInput,
          'userId' | 'avatarId' | 'bannerId'
        >,
      });
  }

  public async getProfile(args: Prisma.ProfileFindUniqueArgs) {
    return await this.prismaService.profile.findUnique(args);
  }
}
