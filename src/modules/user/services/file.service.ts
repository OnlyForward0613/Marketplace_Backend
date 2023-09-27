import { FileUploadService, GeneratorService } from '@common/providers';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';

@Injectable()
export class FileService {
  private _logger = new Logger(FileService.name);
  constructor(
    private prismaService: PrismaService,
    private fileUploadService: FileUploadService,
    private generatorService: GeneratorService,
  ) {}

  public async createPhoto(file: Express.Multer.File) {
    const uploaded = await this.fileUploadService.uploadFile(file);
    return await this.prismaService.photo.create({
      data: {
        id: this.generatorService.uuid(),
        url: uploaded.path,
        fileEntityId: uploaded.id,
      },
    });
  }

  public async updatePhotoById(photoId: string, file: Express.Multer.File) {
    const uploaded = await this.fileUploadService.uploadFile(file);

    const photo = await this.prismaService.photo.findUnique({
      where: { id: photoId },
    });

    if (photo)
      return await this.prismaService.photo.update({
        where: { id: photoId },
        data: {
          url: uploaded.path,
          fileEntityId: uploaded.id,
        },
      });
    else
      return await this.prismaService.photo.create({
        data: {
          id: this.generatorService.uuid(),
          url: uploaded.path,
          fileEntityId: uploaded.id,
        },
      });
  }

  public async getPhotoById(photoId: string) {
    return await this.prismaService.photo.findUnique({
      where: { id: photoId },
    });
  }
}
