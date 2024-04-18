import { Injectable } from '@nestjs/common';
import {
  BulkCreateOptions,
  CreateOptions,
  DestroyOptions,
  FindOptions,
  Model,
  UpdateOptions,
} from 'sequelize';

@Injectable()
export class SequelizeRepository<T extends Model<T>> {
  constructor(protected model: { new (): T } & typeof Model) {}

  async create(attributes: any, options: CreateOptions<T> = {}) {
    return this.model.create<T>(attributes, options);
  }

  async bulkCreate(attributes: any, options?: BulkCreateOptions) {
    return this.model.bulkCreate(attributes, options);
  }

  async findAll(options: FindOptions<T> = {}) {
    return this.model.findAll<T>(options);
  }

  async findOne(options: FindOptions<T>) {
    return this.model.findOne<T>(options);
  }

  async findAndUpdate(attributes: Partial<T>, options: UpdateOptions<T>) {
    return this.model.update<T>(attributes, options);
  }

  async findAndDelete(options: DestroyOptions<T> = {}) {
    return this.model.destroy<T>(options);
  }
}
