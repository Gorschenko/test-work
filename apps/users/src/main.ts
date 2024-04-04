import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { KafkaServiceName, KafkaServicesFactory } from '@app/services';
import { setKafkaClientOptions } from '@app/configs';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const factory = new KafkaServicesFactory();
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const usersService = factory.create(KafkaServiceName.USERS);
  app.connectMicroservice(setKafkaClientOptions(configService, usersService));

  await app.startAllMicroservices();
  await app.init();
}

bootstrap();
