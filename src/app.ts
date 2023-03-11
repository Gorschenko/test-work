import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';

@injectable()
export class App {
  app: Express;
  PORT: number;
  server: Server;

  constructor(@inject(TYPES.Logger) private logger: ILogger) {
    this.app = express();
    this.PORT = 8000;
  }

  public async init(): Promise<void> {
    this.server = this.app.listen(this.PORT);
    this.logger.log(`Сервер запущен на http://localhost:${this.PORT}`);
  }
}
