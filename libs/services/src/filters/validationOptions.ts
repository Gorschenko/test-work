import { ValidationPipeOptions } from '@nestjs/common';
import { HttpError } from './errors/HttpError';
import { ValidationError } from 'class-validator';
import { handleErrorsArray } from '@app/utils';
import { Http } from '@app/types';

export class CustomValidationPipeOptions implements ValidationPipeOptions {
  constructor() {
    this.exceptionFactory = this.exceptionFactory.bind(this);
  }

  exceptionFactory(errors: ValidationError[]) {
    const message = handleErrorsArray(errors);
    return new HttpError({ status: Http.Status.BAD_REQUEST, message: message });
  }
}
