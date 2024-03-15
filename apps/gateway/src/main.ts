import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const APP_PORT = configService.get('APP_PORT') || 3000;
  const GLOBAL_PREFIX = 'api';

  app.setGlobalPrefix(GLOBAL_PREFIX);
  app.enableCors();
  app.enableShutdownHooks();

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
  await app.listen(APP_PORT);
}

bootstrap();
