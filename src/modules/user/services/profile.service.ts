import { IPayloadUserJwt } from '@common/interfaces';
import { FileUploadService, GeneratorService } from '@common/providers';
import { UpdateProfileDto } from '@modules/user/dto/update-profile.dto';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from './user.service';

@Injectable()
export class ProfileService {
  private logger = new Logger(ProfileService.name);
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private fileUploadService: FileUploadService,
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
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
  }

  public async getProfile(userId: string) {
    return await this.prismaService.profile.findUnique({
      where: { userId },
    });
  }

  public async createAvatar(actor: User, file: Express.Multer.File) {
    const uploaded = await this.fileUploadService.uploadFile(file);
    return await this.prismaService.profile.update({
      where: {
        userId: actor.id,
      },
      data: {
        avatar: {
          create: {
            id: this.generatorService.uuid(),
            url: uploaded.path,
            fileEntityId: uploaded.id,
          },
        },
      },
    });
  }
}
