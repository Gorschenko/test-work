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

  async getCities(): Promise<CityEntity[]> {
    return await this.cityRepository.getCities();
  }

  async createCity(city: CreateCityDto): Promise<CityEntity | null> {
    const existedCity = await this.cityRepository.getCity(city.value);
    if (existedCity) {
      return null;
    }
    const newCity = new CityEntity(city);
    return await this.cityRepository.createCity(newCity);
  }

  async deleteCity(value: string): Promise<boolean> {
    const existedCity = await this.cityRepository.getCity(value);
    if (!existedCity) {
      return false;
    }
    return await this.cityRepository.deleteCity(value);
  }

  async editCity(value: string, city: EditCityDto): Promise<CityEntity | null> {
    const existedCity = await this.cityRepository.getCity(value);
    if (!existedCity) {
      return null;
    }
    return await this.cityRepository.editCity(value, city);
  }
}
