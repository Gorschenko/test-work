import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { CityRepository } from './city.repository';
import { CreateCityDto } from './dto/create.city.dto';
import { EditCityDto } from './dto/edit.city.dto';
import { CityEntity } from './city.entity';

@injectable()
export class CityService {
  constructor(@inject(TYPES.CityRepository) private cityRepository: CityRepository) {}

  async getCities(): Promise<CityEntity[] | []> {
    const cities = await this.cityRepository.getCities();
    return cities;
  }

  async createCity(city: CreateCityDto): Promise<CityEntity | null> {
    const newCity = new CityEntity(city);
    return await this.cityRepository.createCity(newCity);
  }

  async deleteCity(id: string): Promise<boolean> {
    const existedCity = await this.cityRepository.getCity(id);
    if (!existedCity) {
      throw new Error('Города с таким id нет');
    }
    return await this.cityRepository.deleteCity(id);
  }

  async editCity(id: string, city: EditCityDto): Promise<CityEntity | null> {
    const existedCity = await this.cityRepository.getCity(id);
    if (!existedCity) {
      throw new Error('Города с таким id нет');
    }
    return await this.cityRepository.editCity(id, city);
  }
}
