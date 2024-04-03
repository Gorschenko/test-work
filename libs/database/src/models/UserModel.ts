import { IUser, UserStatus } from '@app/types';
import {
  AllowNull,
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import { ModelName } from '../data';

@Table({ modelName: ModelName.USERS })
export class UserModel extends Model implements IUser {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column(DataType.NUMBER)
  id: number;

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
  @Default(UserStatus.INACTIVE)
  @Column(DataType.ENUM(...Object.values(UserStatus)))
  status: UserStatus;

  @CreatedAt
  @AllowNull(false)
  @Default(Date.now())
  @Column(DataType.DATE)
  createdAt: Date;

  @UpdatedAt
  @AllowNull(false)
  @Default(Date.now())
  @Column(DataType.DATE)
  updatedAt: Date;
}
