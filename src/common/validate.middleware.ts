import { NextFunction, Request, Response } from 'express';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { IMiddleware } from './middleware.interface';
import { validate } from 'class-validator';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    const instance = plainToClass(this.classToValidate, req.body);
    const errors = await validate(instance);
    if (errors.length > 0) {
      res.status(422).send(errors);
    } else {
      next();
    }
  }
}
