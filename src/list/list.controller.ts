import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { ListService } from './list.service';

@injectable()
export class ListController extends BaseController {
  constructor(
    @inject(TYPES.Logger) private loggerService: ILogger,
    @inject(TYPES.ListService) private listService: ListService,
  ) {
    super(loggerService);
    this.bindRoutes([]);
  }
}
