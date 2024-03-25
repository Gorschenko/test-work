import { DotenvParseOutput } from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { valifateEnvConfig } from '@app/configs';
import { EnvConfigFactory } from './configs/envs/EnvConfigFactory';
import { UsersModule } from './users/users.module';

const getConfigModuleOptions = (): ConfigModuleOptions => ({
  envFilePath: `envs/users/.${process.env.NODE_ENV}.env`,
  isGlobal: true,
  validate: (config: DotenvParseOutput) => valifateEnvConfig(EnvConfigFactory, config),
});

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
