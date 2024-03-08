import { Container } from 'inversify';
import { App } from './app';
import { TYPES } from './types';
import { BINDINGS } from './bindings';

const bootstrap = (): void => {
  const appContainer = new Container();
  appContainer.load(BINDINGS);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
};

bootstrap();
