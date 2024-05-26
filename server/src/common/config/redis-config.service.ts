import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisModuleOptions, RedisModuleOptionsFactory } from '@nestjs-modules/ioredis';

@Injectable()
export class RedisConfigService implements RedisModuleOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createRedisModuleOptions(): RedisModuleOptions | Promise<RedisModuleOptions> {
    return {
      type: 'single',
      options: {
        host: this.configService.get('REDIS_HOST'),
        port: this.configService.get('REDIS_PORT'),
        password: this.configService.get('REDIS_PASSWORD'),
      },
    };
  }
}
