import { Sequelize, DataTypes, Model } from 'sequelize';
import { ICity } from '../../types/CityInterface';
import { BaseModel, MODELS_NAMES } from './data';

export default class CityModel extends Model {
  readonly id: number;
  readonly name: string;
  readonly foundedAt: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

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
