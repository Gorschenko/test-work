import { IUser, UserStatus } from '@app/types';
import { AllowNull, Column, DataType, Model, Table, Unique } from 'sequelize-typescript';
import { ModelName } from '../data';

@Table({ modelName: ModelName.USERS })
export class UserModel extends Model<IUser> {
  @AllowNull(false)
  @Column(DataType.STRING)
  firstName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  lastName: string;

  @Unique(true)
  @AllowNull(false)
  @Column(DataType.STRING)
  email: string;

  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(UserStatus)))
  status: UserStatus;
}
