import { v4 as uuidv4 } from 'uuid';

export class CityEntity {
  id?: string;
  name: string;
  foundedAt: string;

  constructor(city: any) {
    this.id = city.id || uuidv4();
    this.name = city.name;
    this.foundedAt = city.foundedAt;
  }
}
