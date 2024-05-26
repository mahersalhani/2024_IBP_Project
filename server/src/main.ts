import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

import helmet from 'helmet';
import { json, urlencoded } from 'express';
import * as cookieParser from 'cookie-parser';
import { OpenApiNestFactory } from 'nest-openapi-tools';

import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  /* --- App --- */
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /* --- CORS --- */
  app.enableCors({
    origin: true,
    credentials: true,
  });

  /* --- Body parser --- */
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  /* --- Trust proxy --- */
  app.set('trust proxy', 'loopback');

  /* --- Helmet --- */
  app.use(helmet());

  /* --- Config service --- */
  const configService = app.get(ConfigService);

  /* --- Port --- */
  const PORT = configService.get<number>('PORT');

  /* --- Global validation pipe --- */
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /* --- Cookie parser --- */
  app.use(cookieParser(configService.get('COOKIES_SECRET')));

  /* --- Global prefix --- */
  app.setGlobalPrefix('api');

  /* --- Swagger --- */
  const swaggerGenerate = configService.get<boolean>('SWAGGER_GENERATE');
  await OpenApiNestFactory.configure(
    app,
    new DocumentBuilder().setTitle('shoppy').setDescription('An API to do awesome things').setVersion('1.0'),
    {
      webServerOptions: {
        enabled: true,
        path: 'swagger.json',
      },
      fileGeneratorOptions: {
        enabled: true,
        outputFilePath: './openapi.yaml', // or ./swagger.yaml
      },
      clientGeneratorOptions: {
        enabled: swaggerGenerate,
        type: 'typescript-axios',
        outputFolderPath: '../@shoppy/api-client',
        additionalProperties:
          'apiPackage=clients,modelPackage=models,withoutPrefixEnums=true,withSeparateModelsAndApi=true',
        openApiFilePath: './openapi.yaml', // or ./swagger.yaml
        skipValidation: true, // optional, false by default
      },
    },
    {
      operationIdFactory: (c: string, method: string) => method,
    },
  );

  await app.listen(PORT);
  logger.log(`Bootstrap is listening on port ${PORT}`);
}
bootstrap();
