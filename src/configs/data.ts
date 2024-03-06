export interface IConfigService {
  get: (key: string) => string;
}

import { Sequelize, Options, Dialect } from 'sequelize';

const client = new Sequelize();

export interface IMysqlConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: 'mysql';
}
