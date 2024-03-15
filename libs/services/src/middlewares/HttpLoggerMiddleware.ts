import { LoggerService } from './../logger.module';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
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
      METHOD: ${method} URL: ${originalUrl} STATUS: ${statusCode} IP: ${ip} TIME: ${processingTime} ms
      REQUEST HEADERS: ${JSON.stringify(headers)}
      REQUEST BODY: ${JSON.stringify(body)}
      `;
  }
}
