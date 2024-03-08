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

  public send(res: Response, status: HttpStatus, message: unknown): ExpressReturnType {
    res.type('application/json');
    return res.status(status).json(message);
  }

  public ok(res: Response, message: unknown): ExpressReturnType {
    return this.send(res, HttpStatus.SUCCESS, message);
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
