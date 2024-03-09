import { injectable } from 'inversify';
import 'reflect-metadata';
import { BaseRepository } from '../database/base.repository';
import CityModel from '../database/models/CityModel';

@injectable()
export class NewCityRepository extends BaseRepository<CityModel> {
  constructor(model: typeof CityModel) {
    super(model);
  }
}
