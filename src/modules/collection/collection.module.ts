import { Module } from '@nestjs/common';
import { CollectionController } from './controllers/collection.controller';
import { CollectionService } from './services/collection.service';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
})
export class CollectionModule {}