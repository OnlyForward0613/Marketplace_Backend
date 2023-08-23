
import Prisma from '@prisma/client';
import { IsArray, IsString, IsEnum } from 'class-validator';
export class AvatarDto {
  @IsString()
  url!: string;

  @IsString()
  mintId!: string;

  @IsString()
  link!: string;

  @IsString()
  verified!: boolean;
}
export class UpdateProfileDto {
  @IsString()
  bio: string;

  @IsString()
  name: string;

  @IsString()
  lastName: string;
}
