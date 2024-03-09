import { inject, injectable } from 'inversify';
import { Model, Sequelize } from 'sequelize';
import { IMysqlConfig } from '../configs/data';
import { TYPES } from '../types';
import { ILoggerService } from '../logger/data';
import { BaseModel, ModelToFactory } from './models/data';
import { Constructable } from '../types/objects';

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

  getInstance(): Sequelize {
    return this.client;
  }
}
