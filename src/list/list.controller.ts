import { Response, Request, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { ListService } from './list.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { EditCityDto } from '../city/dto/edit.city.dto';
import { CreateListDto } from './dto/create.list.dto';

@injectable()
export class ListController extends BaseController {
  constructor(
    @inject(TYPES.Logger) loggerService: ILogger,
    @inject(TYPES.ListService) private listService: ListService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getLists,
      },
      {
        path: '/create',
        method: 'post',
        func: this.createList,
        middlewares: [new ValidateMiddleware(EditCityDto)],
      },
    ]);
  }

  async getLists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cities = await this.listService.getLists();
    this.ok(res, cities);
  }

  async createList(
    req: Request<{}, {}, CreateListDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const newList = await this.listService.createList(req.body);
    this.ok(res, newList);
  }
}
