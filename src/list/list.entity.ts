import { v4 as uuidv4 } from 'uuid';
import { EditCityDto } from '../city/dto/edit.city.dto';

export class ListEntity {
  shortName: string;
  fullName: string;
  color: string;
  cities: EditCityDto[];

  constructor(list: any) {
    this.shortName = list.shortName;
    this.fullName = list.fullName;
    this.color = list.color;
    this.cities = list.cities;
  }
}
