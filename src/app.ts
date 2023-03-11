import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { IExeptionFilter } from './errors/exeption.filter.interface';
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
  ) {
    this.app = express();
    this.PORT = 8000;
  }

  useExeptionFilters(): void {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init(): Promise<void> {
    this.useExeptionFilters();

    this.server = this.app.listen(this.PORT);
    this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`);
  }
}
