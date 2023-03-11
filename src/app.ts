import express, { Express } from 'express';
import { Server } from 'http';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class App {
  app: Express;
  PORT: number;
  server: Server;

  constructor() {
    this.app = express();
    this.PORT = 8000;
  }

  public async init(): Promise<void> {
    this.server = this.app.listen(this.PORT);
  }
}
