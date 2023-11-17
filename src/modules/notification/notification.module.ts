import { Module } from '@nestjs/common';
import { NotificationService } from './services/notification.service';
import { NotificationController } from './controllers/notification.controller';
@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
