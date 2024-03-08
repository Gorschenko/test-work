import { Request, Router, Response, NextFunction } from 'express';
import { injectable } from 'inversify';
import { ILoggerService } from '../logger/data';
import { ExpressReturnType, IControllerRoute } from './data';
import { HttpStatus } from '../filters/data';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private loggerService: ILoggerService) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): ExpressReturnType {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): ExpressReturnType {
    return this.send(res, HttpStatus.SUCCESS, {
      ok: true,
      payload: message,
    });
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      const middleware = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
          const result = await route.func.call(this, req, res, next);
          this.ok(res, result);
        } catch (e) {
          next(e);
        }
      };
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}
