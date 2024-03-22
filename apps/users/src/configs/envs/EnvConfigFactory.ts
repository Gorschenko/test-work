import { DevEnvConfig } from './DevEnvConfig';
import { LocalEnvConfig } from './LocalEnvConfig';
import { ProdEnvConfig } from './ProdEnvConfig';

export class EnvConfigFactory {
  create(mode: string) {
    switch (mode) {
      case 'local':
        return LocalEnvConfig;
      case 'dev':
        return DevEnvConfig;
      case 'prod':
        return ProdEnvConfig;
      default:
        throw Error('Переменная окружения NODE_ENV является невалидной');
    }
  }
}
