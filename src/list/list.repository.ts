import { inject, injectable } from 'inversify';
import { ListEntity } from './list.entity';
import 'reflect-metadata';
import { DatabaseService } from '../database/database.service';
import { EDatabaseFiles } from '../database/dictionary.database';
import { TYPES } from '../types';

@injectable()
export class ListRepository {
  constructor(@inject(TYPES.DatabaseService) private databaseService: DatabaseService) {}

  async getLists(): Promise<ListEntity[]> {
    return await this.databaseService.getFileData(EDatabaseFiles.LIST);
  }

  async getList(shortName: string): Promise<ListEntity | null> {
    const lists = await this.databaseService.getFileData(EDatabaseFiles.LIST);
    return lists.find((c: ListEntity) => c.shortName === shortName);
  }

  async createList(list: ListEntity): Promise<ListEntity | null> {
    const lists = await this.databaseService.getFileData(EDatabaseFiles.LIST);
    lists.push(list);
    await this.databaseService.writeDataToFile(EDatabaseFiles.LIST, lists);
    return list;
  }
}
