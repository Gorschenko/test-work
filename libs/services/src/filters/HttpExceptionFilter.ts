import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { HttpError } from './errors/HttpError';

@Catch(HttpError)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(e: HttpError, host: ArgumentsHost) {
    console.log(222, typeof e);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    res.status(e.status).send({
      code: e.code,
      message: e.message,
      path: req.url,
    });
  }
}
