import { Module } from '@nestjs/common';
import { LaunchpadService } from './services/launchpad.service';
import { LaunchpadController } from './controllers/launchpad.controller';

@Module({
  imports: [],
  providers: [LaunchpadService],
  controllers: [LaunchpadController],
  exports: [LaunchpadService],
})
export class LaunchpadModule {}
