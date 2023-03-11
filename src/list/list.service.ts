import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { ListRepository } from './list.repository';
import { CreateListDto } from './dto/create.list.dto';

@injectable()
export class ListService {
  constructor(@inject(TYPES.ListRepository) private listRepository: ListRepository) {}

  getLists() {}

  createList(list: CreateListDto) {}
}
