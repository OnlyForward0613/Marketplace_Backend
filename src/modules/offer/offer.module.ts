import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './controllers/offer.controller';
import { NotificationService } from '@modules/notification/services/notification.service';
@Module({
  controllers: [OfferController],
  providers: [OfferService, NotificationService],
})
export class OfferModule {}
