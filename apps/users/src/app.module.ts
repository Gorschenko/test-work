import { DotenvParseOutput } from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { validateEnvConfig } from '@app/configs';
import { EnvConfigFactory } from './configs/envs/EnvConfigFactory';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';

const getConfigModuleOptions = (): ConfigModuleOptions => ({
  envFilePath: `envs/users/.${process.env.NODE_ENV}.env`,
  isGlobal: true,
  validate: (config: DotenvParseOutput) => validateEnvConfig(EnvConfigFactory, config),
});

@Module({
  imports: [ConfigModule.forRoot(getConfigModuleOptions()), SequelizeModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
