import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { IExeptionFilter } from './exeption.filter.interface';
import 'reflect-metadata';
import { HTTPError } from './http-error.class';
import { NextFunction, Request, Response } from 'express';

export interface IResponseErrorObj {
  ok: boolean;
  err: string;
  payload: null;
}

@injectable()
export class ExeptionFilter implements IExeptionFilter {
  constructor(@inject(TYPES.Logger) private logger: ILogger) {}

  catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HTTPError) {
      this.logger.error(`[${err.context}] Ошибка ${err.statusCode}: ${err.message}`);
      res.status(err.statusCode).send(this.getResponseErrorObject(err.message));
    } else {
      this.logger.error(`${err.message}`);
      res.status(500).send(this.getResponseErrorObject(err.message));
    }
  }

  getResponseErrorObject(errorMessage: string): IResponseErrorObj {
    return {
      ok: false,
      err: errorMessage,
      payload: null,
    };
  }
}
