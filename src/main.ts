import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ExeptionFilter } from './errors/expetion.filter';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';

export interface IBootstrapReturn {
  appContainer: Container;
  app: App;
}

const appBildings = new ContainerModule((bind: interfaces.Bind) => {
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<App>(TYPES.Application).to(App);
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
