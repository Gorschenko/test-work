import { ErrorCode } from '@app/types';
import { HttpStatus } from '@nestjs/common';

export class HttpError {
  status: HttpStatus;
  code: ErrorCode;
  message?: string;
  path?: string;
  stack?: string;

  constructor(e: HttpError) {
    this.status = e.status;
    this.code = e.code;
    this.message = e.message;
  }
}
