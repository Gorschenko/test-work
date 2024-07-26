import { LoggerService } from '@app/services';
import { isJson } from '@app/utils';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

// TO DO
// Переделать под Логгер

interface IRequestMessageOptions {
  method: string;
  url: string;
  status: number;
  ip: string;
  time: number;
  requestHeaders: string;
  requestBody: string;
  responseBody: string;
}

export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggerService: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction): void {
    const requestTimeStart = Date.now();
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks: Buffer[] = [];
    let responseBody: string;

    // Получение responseBody
    res.write = (...args: any[]) => {
      chunks.push(Buffer.from(args[0]));
      return oldWrite.apply(res, args);
    };

    res.end = (...args: any[]) => {
      if (args[0]) {
        chunks.push(Buffer.from(args[0]));
      }
      responseBody = Buffer.concat(chunks).toString('utf8');
      responseBody = Buffer.concat(chunks).toString('utf8');
      responseBody = isJson(responseBody) ? JSON.parse(responseBody) : responseBody;
      return oldEnd.apply(res, args);
    };

    // Формирование сообщения для лога
    res.on('close', () => {
      const requestTime = Date.now() - requestTimeStart;
      const { method, originalUrl, ip, headers, body } = req;
      const { statusCode } = res;

      const requestMessageOptions = {
        method,
        url: originalUrl,
        status: statusCode,
        ip,
        time: requestTime,
        requestHeaders: JSON.stringify(headers),
        requestBody: JSON.stringify(body),
        responseBody,
      };

      const message = this.getRequestMessage(requestMessageOptions);
      this.loggerService.log(message);
    });

    next();
  }

  getRequestMessage(o: IRequestMessageOptions): string {
    return `
      REQUEST:
        METHOD: ${o.method}
        URL: ${o.url}
        IP: ${o.ip}
        HEADERS: ${o.requestHeaders}
        BODY: ${o.requestBody}
      RESPONSE:
        STATUS: ${o.status}
        TIME: ${o.time} ms
        BODY: ${o.responseBody}
      `;
  }
}
