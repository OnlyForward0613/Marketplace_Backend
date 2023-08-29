import { Module } from '@nestjs/common';
import { ListingController } from './controllers/listing.controller';
import { ListingService } from './services/listing.service';
@Module({
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
