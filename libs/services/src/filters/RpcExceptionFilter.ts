import { Response, Request } from 'express';
import { ErrorCode } from '@app/types';
import { Catch, ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

interface IRpcException {
  status: HttpStatus;
  code: ErrorCode;
  message: string;
  topic?: string;
  service?: string;
}

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  async catch(e: IRpcException, host: ArgumentsHost) {
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
