import { validateByClassSync } from '@app/utils';
import { ClassConstructor } from 'class-transformer';

export const validateEnvConfig = (
  classForValidate: ClassConstructor<object>,
  config: object,
): object => {
  const { instance: validatedConfig, errors } = validateByClassSync(classForValidate, config);
  if (errors.length) {
    const message = errors
      .map((e) => (e.constraints ? Object.values(e.constraints).join(', ') : ''))
      .join(', ');
    throw new Error(`Env конфигурация является невалидной: ${message}`);
  }
  return validatedConfig;
};
