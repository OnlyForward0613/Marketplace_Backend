import { Module } from '@nestjs/common';
import { OfferService } from './services/offer.service';
import { OfferController } from './controllers/offer.controller';
@Module({
  controllers: [OfferController],
  providers: [OfferService],
})
export class OfferModule {}
