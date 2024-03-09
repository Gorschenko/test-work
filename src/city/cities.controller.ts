import { Request } from 'express';
import { BaseController } from '../common/base.controller';
import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { CitiesService } from './city.service';
import { ValidateMiddleware } from '../common/validate.middleware';
import { ILoggerService } from '../logger/data';
import { CreateCityContract } from '../contracts/cities/CreateCityContract';
import { GetAllCitiesContract } from '../contracts/cities/GetAllCitiesContract';
import { DeleteCityContract } from '../contracts/cities/DeleteCityContract';
import { UpdateCityContract } from '../contracts/cities/UpdateCityContract';

@injectable()
export class CitiesController extends BaseController {
  constructor(
    @inject(TYPES.LoggerService) loggerService: ILoggerService,
    @inject(TYPES.CitiesService) private citiesService: CitiesService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: GetAllCitiesContract.path,
        method: GetAllCitiesContract.method,
        func: this.findAll,
      },
      {
        path: CreateCityContract.path,
        method: CreateCityContract.method,
        func: this.create,
        middlewares: [new ValidateMiddleware(CreateCityContract.RequestBody)],
      },
      {
        path: DeleteCityContract.path,
        method: DeleteCityContract.method,
        func: this.delete,
        middlewares: [
          new ValidateMiddleware(DeleteCityContract.RequestParams, 'params'),
          new ValidateMiddleware(DeleteCityContract.RequestQuery, 'query'),
        ],
      },
      {
        path: UpdateCityContract.path,
        method: UpdateCityContract.method,
        func: this.update,
        middlewares: [
          new ValidateMiddleware(UpdateCityContract.RequestParams, 'params'),
          new ValidateMiddleware(UpdateCityContract.RequestBody),
        ],
      },
    ]);
  }

  async findAll(): Promise<GetAllCitiesContract.ResponseBody> {
    const cities = await this.citiesService.findAll();
    return {
      cities,
    };
  }

  async create({
    body,
  }: Request<
    unknown,
    unknown,
    CreateCityContract.RequestBody
  >): Promise<CreateCityContract.ResponseBody> {
    const city = await this.citiesService.create(body);
    return {
      city,
    };
  }

  async delete({
    params,
    query,
  }: Request<
    DeleteCityContract.RequestParams,
    unknown,
    unknown,
    DeleteCityContract.RequestQuery
  >): Promise<DeleteCityContract.ResponseBody> {
    const count = await this.citiesService.delete({ ...params, ...query });
    return {
      count,
    };
  }

  async update({
    params,
    body,
  }: Request<
    UpdateCityContract.RequestParams,
    unknown,
    UpdateCityContract.RequestBody
  >): Promise<UpdateCityContract.ResponseBody> {
    return await this.citiesService.update(params, body);
  }
}
