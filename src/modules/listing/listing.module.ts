import { Module } from '@nestjs/common';
import { ListingController } from './controllers/listing.controller';
import { ListingService } from './services/listing.service';
import { NotificationService } from '@modules/notification/services/notification.service';
@Module({
  controllers: [ListingController],
  providers: [ListingService, NotificationService],
})
export class ListingModule {}
