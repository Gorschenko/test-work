import { DataTypes, Model, Sequelize } from 'sequelize';
import { MODELS_NAMES, ModelToFactory } from './data';
import { ICityList } from '../../types/CityListInterface';

export default class CityListModel extends Model<ICityList> implements ModelToFactory {
  initialize: (client: Sequelize) => void;
  static initialize(client: Sequelize): void {
    CityListModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        fullName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        shorName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        color: {
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
        modelName: MODELS_NAMES.CITY_LIST,
        tableName: 'CityLists',
      },
    );
  }
}
