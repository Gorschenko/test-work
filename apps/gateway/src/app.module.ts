import { DotenvParseOutput } from 'dotenv';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { getKafkaOptions, valifateEnvConfig } from '@app/configs';
import {
  HttpLoggerMiddleware,
  IKafkaService,
  KafkaModule,
  KafkaServiceName,
  KafkaServicesFactory,
  LoggerModule,
} from '@app/services';
import { EnvConfigFactory } from './configs/envs/EnvConfigFactory';

const getConfigModuleOptions = (): ConfigModuleOptions => ({
  envFilePath: `envs/gateway/.${process.env.NODE_ENV}.env`,
  isGlobal: true,
  validate: (config: DotenvParseOutput) => valifateEnvConfig(EnvConfigFactory, config),
});

const getKafkaClients = (): IKafkaService[] => {
  const factory = new KafkaServicesFactory();
  const usersService = factory.create(KafkaServiceName.USERS);

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
