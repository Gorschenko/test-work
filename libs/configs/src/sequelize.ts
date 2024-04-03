import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModuleAsyncOptions, SequelizeModuleOptions } from '@nestjs/sequelize';

export const getSequelizeConfig = (): SequelizeModuleAsyncOptions => {
  return {
    useFactory: getSequelizeOptions,
    imports: [ConfigModule],
    inject: [ConfigService],
  };
};

const getSequelizeOptions = (configService: ConfigService): SequelizeModuleOptions => ({
  dialect: 'mysql',
  host: configService.get('MYSQL_HOST') || '',
  port: +configService.get('MYSQL_PORT') || +'',
  username: configService.get('MYSQL_USERNAME') || '',
  password: configService.get('MYSQL_PASSWORD') || '',
  database: configService.get('MYSQL_DATABASE') || '',
  repositoryMode: true,
  autoLoadModels: true,
});
