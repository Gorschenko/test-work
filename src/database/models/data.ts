import { Model, Sequelize } from 'sequelize';

export enum MODELS_NAMES {
  CITY = 'City',
  CITY_LIST = 'CityList',
  CITY_LIST_TO_CITY = 'CityListToCity',
}

export interface IBaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseModel<T extends IBaseModel> extends Model<T> {
  initialize: (client: Sequelize) => void;
}

export interface ModelToFactory {
  initialize: (client: Sequelize) => void;
}
