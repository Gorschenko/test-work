import { DotenvParseOutput } from 'dotenv';
import { Module } from '@nestjs/common';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { validateEnvConfig } from '@app/configs';
import { EnvConfigFactory } from './configs/envs/EnvConfigFactory';

const validate = (config: DotenvParseOutput) => {
  const envConfigFactory = new EnvConfigFactory();
  const EnvConfig = envConfigFactory.create(process.env.NODE_ENV);
  return validateEnvConfig(EnvConfig, config);
};

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `envs/gateway/.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
