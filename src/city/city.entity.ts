import { v4 as uuidv4 } from 'uuid';

export class CityEntity {
  name: string;
  value: string;
  foundedAt: string;

  constructor(city: any) {
    this.name = city.name;
    this.value = city.value;
    this.foundedAt = city.foundedAt;
  }
}
