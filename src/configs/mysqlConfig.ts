import { IConfigService, IMysqlConfig } from './data';

export const getMySqlConfig = (configService: IConfigService): IMysqlConfig => ({
  host: configService.get('MYSQL_HOST') || '',
  port: +configService.get('MYSQL_PORT'),
  username: configService.get('MYSQL_USERNAME') || '',
  password: configService.get('MYSQL_PASSWORD') || '',
  database: configService.get('MYSQL_DATABASE') || '',
  dialect: 'mysql',
});
