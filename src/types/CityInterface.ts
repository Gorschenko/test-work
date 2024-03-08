import { IBaseModel } from './BaseModelInterface';

export interface ICity extends IBaseModel {
  name: string;
  foundedAt: string;
}
