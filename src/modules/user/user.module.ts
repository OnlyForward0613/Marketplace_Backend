import { Module } from '@nestjs/common';
import {
  ProfileController,
  UserController,
} from './controllers';
import {
  ProfileService,
  UserService,
} from './services';
@Module({
  imports: [],
  providers: [
    UserService,
    ProfileService,
  ],
  controllers: [
    UserController,
    ProfileController,
  ],
  exports: [UserService],
})
export class UserModule {}
