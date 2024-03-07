import { Sequelize, Model, DataTypes } from 'sequelize';
import { CityToCreate, ICity } from '../../types/CityInterface';
import { ModelToFactory } from './data';

export default class CityModel extends Model<ICity, CityToCreate> implements ModelToFactory {
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
        modelName: 'City',
        tableName: 'cities',
      },
    );
  }
}
