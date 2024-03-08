import { IBaseModel } from './BaseModelInterface';

export interface ICityList extends IBaseModel {
  fullName: string;
  shorName: string;
  color: string;
}
