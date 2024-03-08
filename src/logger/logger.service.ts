import { injectable } from 'inversify';
import { Logger, ILogObj } from 'tslog';
import { ILoggerService } from './data';

@injectable()
export class LoggerService implements ILoggerService {
  public logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger<ILogObj>({
      hideLogPositionForProduction: true,
      prettyLogTimeZone: 'local',
    });
  }

  log(...args: unknown[]): void {
    this.logger.info(...args);
  }

  error(...args: unknown[]): void {
    this.logger.info(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.info(...args);
  }
}
