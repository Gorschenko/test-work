import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './data';
import { ILoggerService } from '../logger/data';

export class HttpLoggerMiddleware implements IMiddleware {
  constructor(private loggerService: ILoggerService) {}

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestStart = Date.now();
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';

    res.on('close', () => {
      const { statusCode } = res;
      const processingTime = Date.now() - requestStart;
      this.loggerService.log(`${method} ${originalUrl} ${statusCode}  - ${userAgent} ${ip}`);
    });

    next();
  }
}
