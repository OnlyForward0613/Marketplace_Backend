// file.controller.ts

import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from '@common/decorators';
import { AccessTokenGuard } from '@common/guards';
import { FileService } from '../services';
import { UploadFileDto } from '../dto/upload-file.dto';

const moduleName = 'file';

@ApiTags(moduleName)
@Controller(moduleName)
export class FileController {
  constructor(private fileService: FileService) {}

  @ApiOperation({ summary: 'Create photo by uploading' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseGuards(AccessTokenGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPhoto(@UploadedFile() file: Express.Multer.File) {
    return this.fileService.createPhoto(file);
  }

  @ApiOperation({ summary: 'Get photo by Id' })
  @Public()
  @Get(':photoId')
  @HttpCode(HttpStatus.OK)
  async getPhotoById(@Param('photoId') photoId: string) {
    return this.fileService.getPhotoById(photoId);
  }

  @ApiOperation({ summary: 'Update photo by uploading again' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadFileDto })
  @UseGuards(AccessTokenGuard)
  @Post(':photoId')
  @UseInterceptors(FileInterceptor('file'))
  async updatePhotoById(
    @Param('photoId') photoId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.fileService.updatePhotoById(photoId, file);
  }
}
