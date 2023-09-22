// launchpad.module.ts

import { Module } from '@nestjs/common';
import { LaunchpadService } from './services/launchpad.service';
import { LaunchpadController } from './controllers/launchpad.controller';

@Module({
  controllers: [LaunchpadController],
  providers: [LaunchpadService],
})
export class LaunchpadModule {}
