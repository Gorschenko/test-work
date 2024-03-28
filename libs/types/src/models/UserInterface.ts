import { IBaseModel } from '@app/database';

export interface IUser extends IBaseModel {
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
}

export enum UserStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
  BLOCKED = 'blocked',
}
