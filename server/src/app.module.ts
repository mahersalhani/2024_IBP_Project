import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { RedisModule } from '@nestjs-modules/ioredis';
import { ThrottlerModule } from '@nestjs/throttler';
import { EventEmitterModule } from '@nestjs/event-emitter';

import * as Joi from 'joi';
import { DataSource } from 'typeorm';

import {
  LoggingInterceptor,
  S3Module,
  RedisConfigService,
  ShopJwtStrategy,
  EmailModule,
  ThrottlerConfigService,
} from '@/common';
import { DatabaseModule } from '@/database';
import { ImageModule, ShopAuthModule, ShopUserModule, AdminModule, GatewayModule } from '@/apps';
import { ShopJwtMiddleware } from '@/middlewares';
import { ShopModule } from './apps/shop/shop.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // Server
        PORT: Joi.number().required(),

        // Database
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().required(),

        // AWS
        S3_BUCKET: Joi.string().required(),
        S3_REGION: Joi.string().required(),
        ACCESS_KEY_ID: Joi.string().required(),
        SECRET_ACCESS_KEY: Joi.string().required(),

        // JWT
        ACCESS_SECRET: Joi.string().required(),
        REFRESH_SECRET: Joi.string().required(),

        // Email
        EMAIL_PASS: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),

        // Cookies
        COOKIES_DOMAIN: Joi.string().required(),
        COOKIES_SECRET: Joi.string().required(),

        // CloudFront
        CLOUDFRONT_DISTRIBUTION_ID: Joi.string().required(),

        // Swagger
        SWAGGER_GENERATE: Joi.boolean().required(),

        // Cms
        CMS_INITIAL_USER_EMAIL: Joi.string().required(),

        // Redis
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().required(),
        REDIS_PASSWORD: Joi.string().optional(),
      }),
      envFilePath: ['./.env'],
    }),

    // Database
    DatabaseModule,

    // AWS
    S3Module,

    // Redis
    RedisModule.forRootAsync({ useClass: RedisConfigService }),

    // Throttler
    ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }),

    // Email
    EmailModule,

    // Event
    EventEmitterModule.forRoot(),

    // Apps
    ImageModule,
    ShopAuthModule,
    ShopUserModule,
    AdminModule,
    ShopModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [
    ShopJwtStrategy,
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: DataSource) {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ShopJwtMiddleware).forRoutes('*');
  }
}
