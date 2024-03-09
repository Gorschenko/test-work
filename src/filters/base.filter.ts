import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { NextFunction, Request, Response } from 'express';
import { HttpStatus, IExceptionFilter } from './data';
import { ILoggerService } from '../logger/data';

export interface IResponseErrorObj {
  ok: boolean;
  err: string;
  payload: null;
}

@injectable()
export class BaseExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.LoggerService) private loggerService: ILoggerService) {}

  catch(err: unknown, req: Request, res: Response, next: NextFunction): void {
    if (err instanceof Error) {
      this.loggerService.error(`${err.message}`);
      res.status(HttpStatus.INTERNAL_SERVER).send({ message: err.message });
    } else {
      next(err);
    }
  }
}
