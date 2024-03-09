import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './data';
import { HttpError } from './HttpError';
import { ILoggerService } from '../logger/data';

export interface IResponseErrorObj {
  ok: boolean;
  err: string;
  payload: null;
}

@injectable()
export class HttpExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.LoggerService) private loggerService: ILoggerService) {}

  catch(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof HttpError) {
      this.loggerService.error(`${err.message}`);
      res.status(err.status).send({ message: err.message });
    } else {
      next(err);
    }
  }
}
