export enum ModelName {
  USERS = 'users',
}

export interface IBaseModel {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
