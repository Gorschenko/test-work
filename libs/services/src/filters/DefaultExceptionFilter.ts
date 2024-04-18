import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(Error)
export class DefaultExceptionFilter implements ExceptionFilter {
  async catch(e: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({
      message: e.message,
      path: req.url,
      stack: e.stack,
    });
  }
}
