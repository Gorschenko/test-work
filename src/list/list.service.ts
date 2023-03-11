import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { ListRepository } from './list.repository';

@injectable()
export class ListService {
  constructor(@inject(TYPES.ListRepository) private listRepository: ListRepository) {}
}
