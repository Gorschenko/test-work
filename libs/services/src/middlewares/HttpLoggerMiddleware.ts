import { generateUniqueString } from '@app/utils';
import { LoggerService } from './../logger.module';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

interface IMessageOptions {
  processingTime: number;
  requestId: string;
}

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = generateUniqueString();
    const requestStart = Date.now();

    res.on('close', () => {
      const processingTime = Date.now() - requestStart;
      const options = {
        processingTime,
        requestId,
      };
      this.loggerService.log(this.getMessage(req, res, options));
    });

    next();
  }

  getMessage(req: Request, res: Response, options: IMessageOptions) {
    const { method, originalUrl, ip, query, headers, body } = req;
    const { processingTime, requestId } = options;
    const { statusCode } = res;

    return `
      METHOD: ${method} URL: ${originalUrl} STATUS: ${statusCode} IP: ${ip} TIME: ${processingTime} ms ID: ${requestId}
      REQUEST QUERY: ${JSON.stringify(query)}
      REQUEST HEADERS: ${JSON.stringify(headers)}
      REQUEST BODY: ${JSON.stringify(body)}
      `;
  }
}
