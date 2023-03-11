import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { CityService } from './city.service';

@injectable()
export class CityController extends BaseController {
  constructor(
    @inject(TYPES.Logger) private loggerService: ILogger,
    @inject(TYPES.CityService) private cityService: CityService,
  ) {
    super(loggerService);
    this.bindRoutes([]);
  }
}
