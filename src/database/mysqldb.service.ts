import { inject, injectable } from 'inversify';
import { Model, QueryOptions, QueryOptionsWithType, QueryTypes, Sequelize } from 'sequelize';
import { IMysqlConfig } from '../configs/data';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/data';
import { ModelToFactory } from './models/data';

@injectable()
export class MysqldbService {
  private client: Sequelize;

  constructor(@inject(TYPES.LoggerService) private readonly loggerService: ILoggerService) {}

  async init(config: IMysqlConfig, models: ModelToFactory[]): Promise<void> {
    this.connect(config);
    this.initializeModels(models);
    await this.syncModels();
    this.loggerService.log('[MysqldbService] Сервис успешно запущен');
  }

  connect(config: IMysqlConfig): void {
    this.client = new Sequelize(config);
    this.loggerService.log('[MysqldbService] Успешно подключились к БД');
  }

  initializeModels(models: ModelToFactory[]): void {
    models.forEach((m) => m.initialize(this.client));
    this.loggerService.log('[MysqldbService] Модели упешно инициализированы');
  }

  async syncModels(): Promise<void> {
    await this.client.sync({ alter: true });
  }

  async query(string: string, options: QueryOptionsWithType<QueryTypes>) {
    return this.client.query(string, options);
  }
}
