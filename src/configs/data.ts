import { Dialect } from 'sequelize';

export interface IConfigService {
  get: (key: string) => string;
}

export interface IMysqlConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: Dialect;
}
