import { DotenvParseOutput } from 'dotenv';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { getKafkaOptions, validateEnvConfig } from '@app/configs';
import { EnvConfigFactory } from './configs/envs/EnvConfigFactory';
import {
  HttpLoggerMiddleware,
  IKafkaService,
  KafkaModule,
  KafkaServiceName,
  KafkaServicesFactory,
  LoggerModule,
} from '@app/services';

const validate = (config: DotenvParseOutput) => {
  const envConfigFactory = new EnvConfigFactory();
  const EnvConfig = envConfigFactory.create(process.env.NODE_ENV);
  return validateEnvConfig(EnvConfig, config);
};

const getConfigModuleOptions = (): ConfigModuleOptions => ({
  envFilePath: `envs/gateway/.${process.env.NODE_ENV}.env`,
  isGlobal: true,
  validate,
});

const getKafkaClients = (): IKafkaService[] => {
  const factory = new KafkaServicesFactory();
  const usersService = factory.create(KafkaServiceName.USERS);
  usersService.setClientId('users');

  return [usersService];
};

@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    KafkaModule.forRootAsync(getKafkaOptions(getKafkaClients())),
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
