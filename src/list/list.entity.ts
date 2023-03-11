import { v4 as uuidv4 } from 'uuid';
import { EditCityDto } from '../city/dto/edit.city.dto';

export class ListEntity {
  id?: string;
  shortName: string;
  fullName: string;
  color: string;
  cities: EditCityDto[];

  constructor(list: any) {
    this.id = list.id || uuidv4();
    this.shortName = list.shortName;
    this.fullName = list.fullName;
    this.color = list.color;
    this.cities = list.cities;
  }
}
