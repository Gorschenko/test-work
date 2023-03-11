import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create.city.dto';
import { EditCityDto } from './dto/edit.city.dto';

@injectable()
export class CityService {
  constructor(@inject(TYPES.CityRepository) private cityRepository: CityRepository) {}

  async getCities() {}

  async createCity(city: CreateCityDto) {}

  async deleteCity(id: string) {}

  async editCity(id: string, city: EditCityDto) {}
}
