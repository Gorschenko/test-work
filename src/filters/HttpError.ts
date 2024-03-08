import { HttpStatus } from './data';

export interface IHttpError {
  message: string;
  status?: number;
}

export class HttpError implements IHttpError {
  message: string;
  status: number;

  constructor({ message, status = HttpStatus.BAD_REQUEST }: IHttpError) {
    this.message = message;
    this.status = status;
  }
}
