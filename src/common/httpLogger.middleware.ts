import { NextFunction, Request, Response } from 'express';
import { IMiddleware } from './data';
import { ILoggerService } from '../logger/data';

export class HttpLoggerMiddleware implements IMiddleware {
  constructor(private loggerService: ILoggerService) {}

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const requestStart = Date.now();

    res.on('close', () => {
      const processingTime = Date.now() - requestStart;
      this.loggerService.log(this.getRequestMessage(req, res, processingTime));
    });

    next();
  }

  getRequestMessage(req: Request, res: Response, processingTime: number) {
    const { method, originalUrl, ip, headers, body } = req;
    const { statusCode } = res;

    return `
      METHOD: ${method} URL: ${originalUrl} STATUS: ${statusCode} IP: ${ip} TIME: ${processingTime}
      REQUEST HEADERS: ${JSON.stringify(headers)}
      REQUEST BODY: ${JSON.stringify(body)}
      `;
  }
}
