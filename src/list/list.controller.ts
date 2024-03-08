import { Response, Request, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ListService } from './list.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { CreateListDto } from './dto/create.list.dto';
import { ILoggerService } from '../logger/data';

@injectable()
export class ListController extends BaseController {
  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
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
        middlewares: [new ValidateMiddleware(CreateListDto)],
      },
    ]);
  }

  async getLists(req: Request, res: Response, next: NextFunction): Promise<void> {
    const lists = await this.listService.getLists();
    this.ok(res, lists);
  }

  async createList(
    req: Request<unknown, unknown, CreateListDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const newList = await this.listService.createList(req.body);
    if (!newList) {
      return next(new Error('Такой список уже существует'));
    }
    this.ok(res, newList);
  }
}
