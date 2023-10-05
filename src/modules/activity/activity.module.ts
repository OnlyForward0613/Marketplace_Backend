import { Module } from '@nestjs/common';
import { ActivityService } from './services/activity.service';
import { ActivityController } from './controllers/activity.controller';
@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
