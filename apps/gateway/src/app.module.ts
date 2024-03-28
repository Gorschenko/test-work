import { DotenvParseOutput } from 'dotenv';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { getKafkaClientOptions, validateEnvConfig } from '@app/configs';
import {
  HttpLoggerMiddleware,
  KafkaModule,
  KafkaServiceName,
  KafkaServicesFactory,
  LoggerModule,
} from '@app/services';
import { EnvConfigFactory } from './configs/envs/EnvConfigFactory';
import { ClientsProviderAsyncOptions } from '@nestjs/microservices';

const getConfigModuleOptions = (): ConfigModuleOptions => ({
  envFilePath: `envs/gateway/.${process.env.NODE_ENV}.env`,
  isGlobal: true,
  validate: (config: DotenvParseOutput) => validateEnvConfig(EnvConfigFactory, config),
});

const getKafkaModuleOptions = (): ClientsProviderAsyncOptions[] => {
  const factory = new KafkaServicesFactory();
  const usersService = factory.create(KafkaServiceName.USERS);
  const services = [usersService];
  return services.map(getKafkaClientOptions);
};

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    KafkaModule.forRootAsync(getKafkaModuleOptions()),
    LoggerModule,
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
