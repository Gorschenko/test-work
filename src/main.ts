import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { CityController } from './city/city.controller';
import { CityRepository } from './city/city.repository';
import { CityService } from './city/city.service';
import { DatabaseService } from './database/database.service';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from './errors/expetion.filter';
import { ListController } from './list/list.controller';
import { ListRepository } from './list/list.repository';
import { ListService } from './list/list.service';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { IConfigService } from './configs/data';
import { ConfigService } from './configs/config.service';
import { MysqldbService } from './database/mysqldb.service';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

const appBildings = new ContainerModule((bind: interfaces.Bind) => {
  bind<App>(TYPES.Application).to(App);
  bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService);
  bind<MysqldbService>(TYPES.MysqldbService).to(MysqldbService);

  bind<CityController>(TYPES.CityController).to(CityController);
  bind<ListController>(TYPES.ListController).to(ListController);

  bind<CityService>(TYPES.CityService).to(CityService);
  bind<ListService>(TYPES.ListService).to(ListService);
  bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService);

  bind<CityRepository>(TYPES.CityRepository).to(CityRepository);
  bind<ListRepository>(TYPES.ListRepository).to(ListRepository);
});

const bootstrap = (): IBootstrapReturn => {
  const appContainer = new Container();
  appContainer.load(appBildings);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return {
    app,
    appContainer,
  };
};

export const { app, appContainer } = bootstrap();
