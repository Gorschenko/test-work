import { DotenvParseOutput } from 'dotenv';
import { Constructable } from '@app/types';
import { validateByClassSync } from '@app/utils';

export interface IEnvFactory {
  create: (mode: string) => Constructable;
}

export const valifateEnvConfig = (
  EnvFactoryClass: Constructable<IEnvFactory>,
  config: DotenvParseOutput,
) => {
  const envConfigFactory = new EnvFactoryClass();
  const EnvConfig = envConfigFactory.create(process.env.NODE_ENV);
  return validate(EnvConfig, config);
};

export const validate = (classToValidate: Constructable, config: DotenvParseOutput): object => {
  const { instance: validatedConfig, errors } = validateByClassSync(classToValidate, config);
  if (errors.length) {
    const message = errors
      .map((e) => (e.constraints ? Object.values(e.constraints).join(', ') : ''))
      .join(', ');
    throw new Error(`Env конфигурация является невалидной: ${message}`);
  }
  return validatedConfig;
};
