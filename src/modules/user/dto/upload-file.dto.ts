import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UploadFileDto {
  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
    description: 'Input upload file',
  })
  @IsNotEmpty()
  file: any;
}
