import { Injectable } from '@nestjs/common';
import { FileEntity, Prisma } from '@prisma/client';

import { PrismaService } from '@prisma/prisma.service';
import { nanoid } from 'nanoid';

@Injectable()
export class FileUploadService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  async uploadFile(file: Express.Multer.File): Promise<FileEntity> {
    // FIXME: add the upload logic to the file S3 service
    const fileStorageInDB: Prisma.FileEntityCreateInput = {
      id: nanoid(16),
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
