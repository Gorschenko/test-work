import { config, DotenvParseOutput } from 'dotenv';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { IConfigService } from './data';

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor() {
    const result = config();
    if (result.error) {
      throw Error(`[Config Service] Ошибка загрузки конфигурации: ${result.error}`);
    }
    this.config = result.parsed as DotenvParseOutput;
  }

  public get(key: string): string {
    return this.config[key];
  }
}
