import { Module } from '@nestjs/common';
import {
  FileController,
  ProfileController,
  UserController,
} from './controllers';
import { FileService, ProfileService, UserService } from './services';
@Module({
  imports: [],
  providers: [FileService, UserService, ProfileService],
  controllers: [FileController, UserController, ProfileController],
  exports: [UserService],
})
export class UserModule {}
