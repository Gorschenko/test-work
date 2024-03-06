import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { CityController } from './city/city.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ListController } from './list/list.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IConfigService } from './configs/data';
import { getMySqlConfig } from './configs/mysqlConfig';
import { MysqldbService } from './database/mysqldb.service';

@injectable()
export class App {
  app: Express;
  PORT: number;
  server: Server;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.MysqldbService) private mysqldbService: MysqldbService,

    @inject(TYPES.CityController) private cityController: CityController,
    @inject(TYPES.ListController) private listController: ListController,
  ) {
    this.app = express();
    this.PORT = 8000;
  }

  useMiddlewares(): void {
    this.app.use(express.json());
  }

  useRoutes(): void {
    this.app.use('/cities', this.cityController.router);
    this.app.use('/lists', this.listController.router);
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  useServices(): void {
    this.connectToMysqldb();
  }

  connectToMysqldb(): void {
    const config = getMySqlConfig(this.configService);
    this.mysqldbService.connect(config);
  }

  public async init(): Promise<void> {
    try {
      this.useMiddlewares();
      this.useRoutes();
      this.useExeptionFilters();
      this.useServices();

      this.server = this.app.listen(this.PORT);
      this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`);
    } catch (e) {
      console.log(e);
    }
  }
}
