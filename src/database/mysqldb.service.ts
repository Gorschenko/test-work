import { inject, injectable } from 'inversify';
import { Sequelize } from 'sequelize';
import { IMysqlConfig } from '../configs/data';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';

@injectable()
export class MysqldbService {
  private client: Sequelize;

  constructor(@inject(TYPES.Logger) private readonly loggerService: ILogger) {}

  connect(config: IMysqlConfig): void {
    this.client = new Sequelize(config);
    this.loggerService.log('[MysqldbService] Успешно подключились к MySql');
  }

  getInstance(): Sequelize {
    return this.client;
  }
}
