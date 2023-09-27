import { Injectable } from '@nestjs/common';
import { FileEntity, Prisma } from '@prisma/client';

import { PrismaService } from '@prisma/prisma.service';
import { nanoid } from 'nanoid';
import { AwsS3Service } from './asw.service';
import { GeneratorService } from './generator.service';

@Injectable()
export class FileUploadService {
  constructor(
    private generator: GeneratorService,
    private prismaService: PrismaService,
    private readonly awsService: AwsS3Service,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<FileEntity> {
    const upload = await this.awsService.uploadImage(file);
    const fileStorageInDB: Prisma.FileEntityCreateInput = {
      id: this.generator.uuid(),
      fileName: file.originalname,
      key: upload.Key,
      mimeType: file.mimetype,
      size: file.size,
      path: upload.Location,
      description: '',
    };
    return await this.prismaService.fileEntity.create({
      data: fileStorageInDB,
    });
  }
}
