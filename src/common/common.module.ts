import { Global, Module } from '@nestjs/common';
import { Logger } from './logger';
import * as providers from './providers';

const services = [Logger, ...Object.values(providers)];

@Global()
@Module({
  providers: services,
  exports: services,
})
export class CommonModule {}
