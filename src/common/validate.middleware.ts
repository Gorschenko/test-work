import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { HttpStatus } from '../filters/data';
import { IMiddleware } from './data';

type ValidateObject = keyof Pick<Request, 'body' | 'params' | 'query' | 'headers'>;

export class ValidateMiddleware implements IMiddleware {
  constructor(
    private classToValidate: ClassConstructor<object>,
    private object: ValidateObject = 'body',
  ) {}

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const instance = plainToClass(this.classToValidate, req[this.object]);
    const errors = await validate(instance, { validationError: { target: false } });
    if (!errors.length) {
      next();
      return;
    }
    const errorMessage = this.handleErrorsArray(errors);
    res.status(HttpStatus.BAD_REQUEST).send({ message: errorMessage });
  }

  handleErrorsArray(errors: ValidationError[]): string {
    return errors.map(this.handleSingleError.bind(this)).join('; ');
  }

  handleSingleError(e: ValidationError): string {
    if (e.constraints) {
      return Object.values(e.constraints).join('; ');
    } else if (e.children) {
      return e.children.map(this.handleSingleError.bind(this)).join('; ');
    } else {
      return '';
    }
  }
}
