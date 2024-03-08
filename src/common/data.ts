import { NextFunction, Request, Response, Router } from 'express';

export interface IMiddleware {
  execute: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: IMiddleware[];
}

export type ExpressReturnType = Response<any, Record<string, any>>;

export interface IParamsDictionary {
  [key: string]: string;
}
