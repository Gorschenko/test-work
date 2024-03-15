import { ClassConstructor, plainToClass } from 'class-transformer';
import { ValidationError, validateSync } from 'class-validator';

export const validateByClassSync = (
  classForValidate: ClassConstructor<object>,
  objectToValidate: object,
) => {
  const instance = plainToClass(classForValidate, objectToValidate);
  const errors = validateSync(instance, {
    validationError: { target: false },
    skipMissingProperties: false,
  });
  return { errors, instance };
};

export const handleSingleError = (e: ValidationError): string => {
  if (e.constraints) {
    return Object.values(e.constraints).join('; ');
  } else if (e.children) {
    return e.children.map(handleSingleError).join('; ');
  } else {
    return '';
  }
};

export const handleErrorsArray = (errors: ValidationError[]): string => {
  return errors.map(handleSingleError).join('; ');
};
