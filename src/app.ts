import { Constructable } from './types/objects';
import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { CitiesController } from './city/cities.controller';
import { ListController } from './list/list.controller';
import { TYPES } from './types';
import { IConfigService } from './configs/data';
import { getMySqlConfig } from './configs/mysqlConfig';
import { MysqldbService } from './database/mysqldb.service';
import CityModel from './database/models/CityModel';
import CityListToCityModel from './database/models/CityListToCityModel';
import CityListModel from './database/models/CityListModel';
import { IExceptionFilter } from './filters/data';
import { ILoggerService } from './logger/data';
import { HttpLoggerMiddleware } from './common/httpLogger.middleware';
import { ROUTES } from './contracts/data';
import { BaseModel, ModelToFactory } from './database/models/data';

@injectable()
export class App {
  app: Express;
  server: Server;

  constructor(
    @inject(TYPES.LoggerService) private loggerService: ILoggerService,
    @inject(TYPES.BaseExceptionFilter) private baseExceptionFilter: IExceptionFilter,
    @inject(TYPES.HttpExceptionFilter) private httpExceptionFilter: IExceptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.MysqldbService) private mysqldbService: MysqldbService,
    @inject(TYPES.CitiesController) private citiesController: CitiesController,
    @inject(TYPES.ListController) private listController: ListController,
  ) {
    this.app = express();
  }

  useMiddlewares(): void {
    this.app.use(express.json());
    const httpLoggerMiddleware = new HttpLoggerMiddleware(this.loggerService);
    this.app.use(httpLoggerMiddleware.execute.bind(httpLoggerMiddleware));
  }

  useRoutes(): void {
    this.app.use(ROUTES.CITIES, this.citiesController.router);
    this.app.use(ROUTES.CITIES_LISTS, this.listController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.baseExceptionFilter.catch.bind(this.baseExceptionFilter));
    this.app.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
  }

  async useServices() {
    await this.initMysqldb();
  }

  useServers(): void {
    const PORT = this.configService.get('APP_PORT');
    this.server = this.app.listen(PORT);
    this.loggerService.log(`Сервер запущен на порту ${PORT}`);
  }

  async initMysqldb() {
    const config = getMySqlConfig(this.configService);
    const models: ModelToFactory[] = [CityModel, CityListModel, CityListToCityModel];
    await this.mysqldbService.init(config, models);
  }

  public async init(): Promise<void> {
    try {
      this.useMiddlewares();
      this.useRoutes();
      this.useExceptionFilters();
      await this.useServices();
      this.useServers();
    } catch (e) {
      this.loggerService.log(e);
      process.exit(1);
    }
  }
}
