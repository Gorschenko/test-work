import { injectable } from 'inversify';
import { ListEntity } from './list.entity';

@injectable()
export class ListRepository {
  async getLists(): Promise<ListEntity[] | []> {
    return [];
  }

  async createList(list: ListEntity): Promise<ListEntity | null> {
    return null;
  }
}
