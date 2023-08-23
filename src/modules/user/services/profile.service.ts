import { IPayloadUserJwt } from '@common/interfaces';
import { FileUploadService, GeneratorService } from '@common/providers';
import { UpdateProfileDto } from '@modules/user/dto/update-profile.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { UserService } from './user.service';

@Injectable()
export class ProfileService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private fileUploadService: FileUploadService,
    private generatorService: GeneratorService,
  ) {}
  public async createProfile(
    payload: IPayloadUserJwt,
    profileDto: UpdateProfileDto,
  ) {
    const profileId = this.generatorService.uuid();
    return await this.prismaService.profile.create({
      data: {
        id: profileId,
        ...profileDto,
        User: {
          connect: {
            id: payload.id,
          },
        },
      },
    });
  }
  public async updateProfile(actor: User, profileDto: UpdateProfileDto) {
    return await this.prismaService.profile.update({
      where: { userId: actor.id },
      data: profileDto,
    });
  }
  public async getProfile(userId: string) {
    return await this.userService.getUser({
      where: { id: userId },
      include: {
        profile: true,
      },
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
