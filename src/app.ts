import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { CityController } from './city/city.controller';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ListController } from './list/list.controller';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';

@injectable()
export class App {
  app: Express;
  PORT: number;
  server: Server;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter,

    @inject(TYPES.CityController) private cityController: CityController,
    @inject(TYPES.ListController) private listController: ListController,
  ) {
    this.app = express();
    this.PORT = 8000;
  }

  useRoutes(): void {
    this.app.use('/cities', this.cityController.router);
    this.app.use('/lists', this.listController.router);
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init(): Promise<void> {
    this.useExeptionFilters();
    this.useRoutes();

    this.server = this.app.listen(this.PORT);
    this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`);
  }
}
