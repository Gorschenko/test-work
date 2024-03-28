import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  CustomValidationPipeOptions,
  DefaultExceptionFilter,
  HttpExceptionFilter,
} from '@app/services';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('APP_PORT') || 3000;
  const GLOBAL_PREFIX = 'api';

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();
  app.enableShutdownHooks();
  const validationOptions = new CustomValidationPipeOptions();
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  app.useGlobalFilters(new DefaultExceptionFilter(), new HttpExceptionFilter());

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
  await app.listen(APP_PORT);
}

bootstrap();
