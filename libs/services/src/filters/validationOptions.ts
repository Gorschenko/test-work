import { HttpStatus, ValidationPipeOptions } from '@nestjs/common';
import { HttpError } from './errors/HttpError';
import { ValidationError } from 'class-validator';
import { handleErrorsArray } from '@app/utils';
import { ErrorCode } from '@app/types';

export class CustomValidationPipeOptions implements ValidationPipeOptions {
  constructor() {
    this.exceptionFactory = this.exceptionFactory.bind(this);
  }

  exceptionFactory(errors: ValidationError[]) {
    const message = handleErrorsArray(errors);
    return new HttpError({
      status: HttpStatus.BAD_REQUEST,
      code: ErrorCode.INVALID_DATA,
      message: message,
    });
  }
}
