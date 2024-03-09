import { IBaseModel } from '../database/models/data';

export interface ICity extends IBaseModel {
  name: string;
  foundedAt: string;
}

export interface ICityToCreate {
  name: string;
  foundedAt: string;
}
