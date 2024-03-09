import { DataTypes, Model, Sequelize } from 'sequelize';
import { MODELS_NAMES } from './data';
import CityModel from './CityModel';
import CityListModel from './CityListModel';

export default class CityListToCityModel extends Model {
  static initialize(client: Sequelize): void {
    CityListToCityModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        cityId: {
          type: DataTypes.INTEGER,
          references: {
            model: MODELS_NAMES.CITY,
            key: 'id',
          },
          allowNull: false,
        },
        cityListId: {
          type: DataTypes.DATE,
          references: {
            model: MODELS_NAMES.CITY_LIST,
            key: 'id',
          },
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
        modelName: MODELS_NAMES.CITY_LIST_TO_CITY,
        tableName: 'CityListToCity',
      },
    );

    CityModel.belongsToMany(CityListModel, {
      through: CityListToCityModel,
      foreignKey: 'cityId',
    });

    CityListModel.belongsToMany(CityModel, {
      through: CityListToCityModel,
      foreignKey: 'cityListId',
    });
  }
}
