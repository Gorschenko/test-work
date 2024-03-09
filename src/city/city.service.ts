import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { ICity, ICityToCreate } from '../types/CityInterface';
import { CitiesRepository } from './cities.repository';
import { HttpError } from '../filters/HttpError';
import { getExistedEntityError } from '../filters/errorsStrings';

@injectable()
export class CitiesService {
  constructor(@inject(TYPES.CitiesRepository) private citiesRepository: CitiesRepository) {}

  async findAll(): Promise<ICity[]> {
    return this.citiesRepository.findAll();
  }

  async create(data: ICityToCreate): Promise<ICity> {
    const existedCity = await this.citiesRepository.findOne({
      where: {
        name: data.name,
      },
    });
    if (existedCity) {
      throw new HttpError(getExistedEntityError('city'));
    }
    return this.citiesRepository.create(data);
  }

  async delete(filters: Partial<ICity> & { cityId?: number }): Promise<number> {
    if (filters.cityId) {
      filters.id = filters.cityId;
      delete filters.cityId;
    }
    return this.citiesRepository.findAndDelete({ where: filters });
  }

  async update(filters: { cityId?: number }, update: Partial<ICity>) {
    return this.citiesRepository.findAndUpdate(update, {
      where: { id: filters.cityId },
    });
  }
}
