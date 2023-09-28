import { Module } from '@nestjs/common';
import { NftController } from './controllers/nft.controller';
import { NftService } from './services/nft.service';

@Module({
  controllers: [NftController],
  providers: [NftService],
})
export class NftModule {}
