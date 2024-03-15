"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEnvConfig = void 0;
const utils_1 = require("../../utils/src");
const validateEnvConfig = (classForValidate, config) => {
    const { instance: validatedConfig, errors } = (0, utils_1.validateByClassSync)(classForValidate, config);
    if (errors.length) {
        const message = errors
            .map((e) => (e.constraints ? Object.values(e.constraints).join(', ') : ''))
            .join(', ');
        throw new Error(`Env конфигурация является невалидной: ${message}`);
    }
    return validatedConfig;
};
exports.validateEnvConfig = validateEnvConfig;
//# sourceMappingURL=envs.js.map