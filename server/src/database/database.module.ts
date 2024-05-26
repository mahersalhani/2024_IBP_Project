import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import * as path from 'path';

import { SnakeNamingStrategy } from './sanke-naming.strategy';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        database: configService.getOrThrow('DB_NAME'),
        username: configService.getOrThrow('DB_USER'),
        password: configService.getOrThrow('DB_PASSWORD'),
        synchronize: configService.getOrThrow('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
        entities: [path.join(__dirname, './entities/**/*.entity{.ts,.js}')],
        logger: 'advanced-console',
        namingStrategy: new SnakeNamingStrategy(),
        logging: false,
        retryAttempts: 10,
        migrations: [path.join(__dirname, './migrations/*{.ts,.js}')],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
