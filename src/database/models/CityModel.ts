import { Sequelize, Model, DataTypes } from 'sequelize';
import { ICity, ICityToCreate } from '../../types/CityInterface';
import { MODELS_NAMES, ModelToFactory } from './data';

export default class CityModel extends Model<ICity, ICityToCreate> implements ModelToFactory {
  initialize: (client: Sequelize) => void;

  static initialize(client: Sequelize): void {
    CityModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        foundedAt: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize: client,
        modelName: MODELS_NAMES.CITY,
        tableName: 'Cities',
      },
    );
  }
}
