import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { fileMimetypeFilter } from '../filters';

export function UploadFile(
  fieldName = 'file',
  required = false,
  localOptions?: MulterOptions,
) {
  return applyDecorators(
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
  );
}

export function ApiImageFile(fileName = 'file', required = false) {
  return UploadFile(fileName, required, {
    fileFilter: fileMimetypeFilter('image'),
  });
}
