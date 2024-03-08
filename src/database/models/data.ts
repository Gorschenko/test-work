import { Model, Sequelize } from 'sequelize';

export enum MODELS_NAMES {
  CITY = 'City',
  CITY_LIST = 'CityList',
  CITY_LIST_TO_CITY = 'CityListToCity',
}

export interface ModelToFactory {
  initialize: (client: Sequelize) => void;
}
