import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import 'reflect-metadata';
import { ListRepository } from './list.repository';
import { CreateListDto } from './dto/create.list.dto';
import { ListEntity } from './list.entity';

@injectable()
export class ListService {
  constructor(@inject(TYPES.ListRepository) private listRepository: ListRepository) {}

  async getLists(): Promise<ListEntity[] | []> {
    const lists = await this.listRepository.getLists();
    return lists;
  }

  async createList(list: CreateListDto): Promise<ListEntity | null> {
    const newCList = new ListEntity(list);
    return await this.listRepository.createList(newCList);
  }
}
