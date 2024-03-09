import { HttpStatus } from './data';

export interface IHttpErrorOptions {
  status: number;
}

const DEFAULT_ERROR_OPTIONS = {
  status: HttpStatus.BAD_REQUEST,
};

export class HttpError {
  message: string;
  status: number;

  constructor(message: string, options: IHttpErrorOptions = DEFAULT_ERROR_OPTIONS) {
    this.message = message;
    this.status = options.status;
  }
}
