import { Sequelize } from 'sequelize';

export interface ModelToFactory {
  initialize: (client: Sequelize) => void;
}
