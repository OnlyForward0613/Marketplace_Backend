import { Global, Module } from '@nestjs/common';
import { Logger } from './logger';
import * as providers from './providers';
import { HttpModule } from '@nestjs/axios';

const services = [Logger, ...Object.values(providers)];

@Global()
@Module({
  imports: [HttpModule],
  providers: services,
  exports: services,
})
export class CommonModule {}
