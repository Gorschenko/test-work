import { DataTypes, Sequelize } from 'sequelize';
import { BaseModel, MODELS_NAMES } from './data';
import { ICityList } from '../../types/CityListInterface';

export default class CityListModel extends BaseModel<ICityList> {
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
