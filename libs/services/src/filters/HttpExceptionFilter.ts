import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { HttpError } from './errors/HttpError';

@Catch(HttpError)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(error: HttpError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    res.status(error.status).send({
      code: error.code,
      message: error.message,
      path: req.url,
    });
  }
}
