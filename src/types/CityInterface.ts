export interface ICity {
  id: number;
  name: string;
  foundedAt: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CityToCreate extends Partial<ICity> {
  name: string;
  foundedAt: string;
}
