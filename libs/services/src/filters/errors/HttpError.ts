import { ErrorCode, Http } from '@app/types';

export class HttpError {
  status: Http.Status;
  code?: ErrorCode;
  message?: string;
  path?: string;
  stack?: string;

  constructor({ status = Http.Status.BAD_REQUEST, code, message, path, stack }: HttpError) {
    this.status = status;
    this.code = code;
    this.message = message;
    this.path = path;
    this.stack = stack;
  }
}
