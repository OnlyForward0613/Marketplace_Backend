import { Module } from '@nestjs/common';
import { LikeService } from './services/like.service';
import { LikeController } from './controllers/like.controller';
@Module({
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}
