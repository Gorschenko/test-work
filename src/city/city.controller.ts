import { Response, Request, NextFunction } from 'express';
import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { CityService } from './city.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { CreateCityDto } from './dto/create.city.dto';
import { EditCityDto } from './dto/edit.city.dto';
import { IParamsDictionary } from '../common/route.interface';

@injectable()
export class CityController extends BaseController {
  constructor(
    @inject(TYPES.Logger) loggerService: ILogger,
    @inject(TYPES.CityService) private cityService: CityService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getCities,
      },
      {
        path: '/create',
        method: 'post',
        func: this.createCity,
        middlewares: [new ValidateMiddleware(CreateCityDto)],
      },
      {
        path: '/:id',
        method: 'delete',
        func: this.deleteCity,
      },
      {
        path: '/:id',
        method: 'put',
        func: this.editCity,
        middlewares: [new ValidateMiddleware(EditCityDto)],
      },
    ]);
  }

  async getCities(req: Request, res: Response, next: NextFunction): Promise<void> {
    const cities = await this.cityService.getCities();
    this.ok(res, cities);
  }

  async createCity(
    req: Request<{}, {}, CreateCityDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const newCity = await this.cityService.createCity(req.body);
    this.ok(res, newCity);
  }

  async deleteCity(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.cityService.deleteCity(req.params.id);
    this.ok(res, result);
  }

  async editCity(
    req: Request<IParamsDictionary, {}, EditCityDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const editedCity = await this.cityService.editCity(req.params.id, req.body);
    this.ok(res, editedCity);
  }
}
