import { Global, Module } from '@nestjs/common';
import { SeaportService } from './seaport.service';

@Global()
@Module({
  providers: [SeaportService],
  exports: [SeaportService],
})
export class SeaportModule {}
