import { injectable } from 'inversify';
import { CityEntity } from './city.entity';

@injectable()
export class CityRepository {
  async getCity(id: string): Promise<CityEntity | null> {
    return null;
  }

  async deleteCity(id: string): Promise<boolean> {
    return true;
  }

  async editCity(id: string, city: CityEntity): Promise<CityEntity | null> {
    return null;
  }

  async getCities(): Promise<CityEntity[] | []> {
    return [];
  }

  async createCity(city: CityEntity): Promise<CityEntity | null> {
    return null;
  }
}
