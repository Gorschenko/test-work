import { inject, injectable } from 'inversify';
import { DatabaseService } from '../database/database.service';
import { EDatabaseFiles } from '../database/dictionary.database';
import { TYPES } from '../types';
import { CityEntity } from './city.entity';
import 'reflect-metadata';

@injectable()
export class CityRepository {
  constructor(@inject(TYPES.DatabaseService) private databaseService: DatabaseService) {}

  async getCity(value: string): Promise<CityEntity | null> {
    const cities = await this.databaseService.getFileData(EDatabaseFiles.CITY);
    return cities.find((c: CityEntity) => c.value === value);
  }

  async deleteCity(value: string): Promise<boolean> {
    let cities = await this.databaseService.getFileData(EDatabaseFiles.CITY);
    cities = cities.filter((c: CityEntity) => c.value !== value);
    await this.databaseService.writeDataToFile(EDatabaseFiles.CITY, cities);
    return true;
  }

  async editCity(value: string, city: CityEntity): Promise<CityEntity> {
    let cities = await this.databaseService.getFileData(EDatabaseFiles.CITY);
    cities = cities.map((c: CityEntity) => {
      if (c.value === value) {
        c = city;
      }
      return c;
    });
    await this.databaseService.writeDataToFile(EDatabaseFiles.CITY, cities);
    return city;
  }

  async getCities(): Promise<CityEntity[]> {
    return await this.databaseService.getFileData(EDatabaseFiles.CITY);
  }

  async createCity(city: CityEntity): Promise<CityEntity> {
    const cities = await this.databaseService.getFileData(EDatabaseFiles.CITY);
    cities.push(city);
    await this.databaseService.writeDataToFile(EDatabaseFiles.CITY, cities);
    return city;
  }
}
