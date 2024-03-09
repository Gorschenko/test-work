import { IBaseModel } from '../database/models/data';

export interface ICityList extends IBaseModel {
  fullName: string;
  shorName: string;
  color: string;
}
