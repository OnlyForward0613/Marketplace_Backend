import { Module } from '@nestjs/common';
import { HideService } from './services/hide.service';
import { HideController } from './controllers/hide.controller';
@Module({
  controllers: [HideController],
  providers: [HideService],
})
export class HideModule {}
