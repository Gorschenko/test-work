import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { Http } from '@app/types';

@Catch(Error)
export class DefaultExceptionFilter implements ExceptionFilter {
  async catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    res.status(Http.Status.INTERNAL_SERVE).send({
      message: error.message,
      path: req.url,
      stack: error.stack,
    });
  }
}
