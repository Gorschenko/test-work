import { ClassConstructor } from 'class-transformer';
import { ValidationError } from 'class-validator';
export declare const validateByClassSync: (classForValidate: ClassConstructor<object>, objectToValidate: object) => {
    errors: ValidationError[];
    instance: object;
};
export declare const handleSingleError: (e: ValidationError) => string;
export declare const handleErrorsArray: (errors: ValidationError[]) => string;
