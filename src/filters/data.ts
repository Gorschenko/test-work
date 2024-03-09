import { NextFunction, Request, Response } from 'express';

export enum HttpStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER = 500,
}

export interface IExceptionFilter {
  catch: (err: unknown, req: Request, res: Response, next: NextFunction) => void;
}
