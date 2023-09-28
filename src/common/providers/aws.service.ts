import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AWS from 'aws-sdk';
import mime from 'mime-types';

import type { IFile } from '../interfaces';
import { GeneratorService } from './generator.service';

@Injectable()
export class AwsS3Service {
  private readonly s3: AWS.S3;

  constructor(
    public configService: ConfigService,
    public generatorService: GeneratorService,
  ) {
    const awsS3Config = this.configService.get('s3Bucket');
    const options: AWS.S3.Types.ClientConfiguration = {
      apiVersion: awsS3Config.AWS_S3_API_VERSION,
      region: awsS3Config.AWS_S3_BUCKET_REGION,
      secretAccessKey: awsS3Config.AWS_S3_SECRET_ACCESS_KEY,
      accessKeyId: awsS3Config.AWS_S3_ACCESS_KEY_ID,
    };

    this.s3 = new AWS.S3(options);
  }

  async uploadImage(file: IFile): Promise<AWS.S3.ManagedUpload.SendData> {
    const fileName = this.generatorService.fileName(
      <string>mime.extension(file.mimetype),
    );
    // TODO: should replace prefix to 'images' for deploy version
    const key = 'images-tmp/' + fileName;
    return await this.s3
      .upload({
        Bucket: this.configService.get('s3Bucket.AWS_S3_BUCKET_NAME'),
        Body: file.buffer,
        Key: key,
        ACL: 'public-read',
        ContentType: file.mimetype,
      })
      .promise();
  }
}
