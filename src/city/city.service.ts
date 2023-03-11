import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { CityRepository } from './city.repository';

@injectable()
export class CityService {
  constructor(@inject(TYPES.CityRepository) private cityRepository: CityRepository) {}
}
