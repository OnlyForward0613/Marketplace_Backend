import { Logger } from '@common/logger';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private _redisClient: Redis;

  constructor(private readonly configService: ConfigService) {
    const _logger = new Logger();
    const redisOpts = this.configService.get('redis');
    const isProd = this.configService.get('application.isProd');
    // this._redisClient = isProd
    //   ? new Redis(redisOpts.REDIS_URL, {
    //       tls: {
    //         rejectUnauthorized: false,
    //         requestCert: true,
    //       },
    //     })
    //   : new Redis({
    //       host: redisOpts.REDIS_HOST,
    //       port: redisOpts.REDIS_PORT,
    //     });
    this._redisClient = new Redis(6379, "localhost", {password: "pass"});
    this._redisClient.on('ready', () => {
      _logger.log(`redis client is ready: ${this._redisClient.status}`);
    });
    this._redisClient.on('error', (error) => {
      _logger.log(`Error on redis client: ${error}`);
    });
  }

  get client() {
    return this._redisClient;
  }
}
