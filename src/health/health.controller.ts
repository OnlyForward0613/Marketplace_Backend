import { Controller, Get } from '@nestjs/common';

@Controller('/health-check')
export class HealthController {
  @Get()
  healthCheck() {
    return { healthCheck: 'ok' };
  }
}
