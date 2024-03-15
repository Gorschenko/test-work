import { DotenvParseOutput } from 'dotenv';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { validateEnvConfig } from '@app/configs';
import { EnvConfigFactory } from './configs/envs/EnvConfigFactory';
import { HttpLoggerMiddleware, KafkaModule, KafkaService, LoggerModule } from '@app/services';

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
@Module({
  imports: [
    ConfigModule.forRoot(getConfigModuleOptions()),
    KafkaModule.register({
      services: [KafkaService.USERS],
    }),
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
