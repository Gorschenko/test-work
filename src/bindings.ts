import { ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { CitiesController } from './city/cities.controller';
import { CitiesService } from './city/city.service';
import { DatabaseService } from './database/database.service';
import { ListController } from './list/list.controller';
import { ListRepository } from './list/list.repository';
import { ListService } from './list/list.service';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { IConfigService } from './configs/data';
import { ConfigService } from './configs/config.service';
import { MysqldbService } from './database/mysqldb.service';
import { BaseExceptionFilter } from './filters/base.filter';
import { HttpExceptionFilter } from './filters/http.filter';
import { IExceptionFilter } from './filters/data';
import { ILoggerService } from './logger/data';
import { CitiesRepository } from './city/cities.repository';
import CityModel from './database/models/CityModel';

export const BINDINGS = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<ILoggerService>(TYPES.LoggerService).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.BaseExceptionFilter).to(BaseExceptionFilter).inSingletonScope();
  bind<IExceptionFilter>(TYPES.HttpExceptionFilter).to(HttpExceptionFilter).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<MysqldbService>(TYPES.MysqldbService).to(MysqldbService).inSingletonScope();

  bind<CitiesController>(TYPES.CitiesController).to(CitiesController);
  bind<ListController>(TYPES.ListController).to(ListController);

  bind<CitiesService>(TYPES.CitiesService).to(CitiesService);
  bind<ListService>(TYPES.ListService).to(ListService);
  bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService);

  bind<CitiesRepository>(TYPES.CitiesRepository).toDynamicValue(
    () => new CitiesRepository(CityModel),
  );
  bind<ListRepository>(TYPES.ListRepository).to(ListRepository);
});
