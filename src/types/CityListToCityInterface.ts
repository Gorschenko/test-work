import { IBaseModel } from '../database/models/data';

export interface ICityListToCity extends IBaseModel {
  cityId: number;
  cityListId: number;
}
