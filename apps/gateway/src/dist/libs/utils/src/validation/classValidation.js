"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrorsArray = exports.handleSingleError = exports.validateByClassSync = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const validateByClassSync = (classForValidate, objectToValidate) => {
    const instance = (0, class_transformer_1.plainToClass)(classForValidate, objectToValidate);
    const errors = (0, class_validator_1.validateSync)(instance, {
        validationError: { target: false },
        skipMissingProperties: false,
    });
    return { errors, instance };
};
exports.validateByClassSync = validateByClassSync;
const handleSingleError = (e) => {
    if (e.constraints) {
        return Object.values(e.constraints).join('; ');
    }
    else if (e.children) {
        return e.children.map(exports.handleSingleError).join('; ');
    }
    else {
        return '';
    }
};
exports.handleSingleError = handleSingleError;
const handleErrorsArray = (errors) => {
    return errors.map(exports.handleSingleError).join('; ');
};
exports.handleErrorsArray = handleErrorsArray;
//# sourceMappingURL=classValidation.js.map