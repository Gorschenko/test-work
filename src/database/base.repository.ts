import { CreateOptions, DestroyOptions, FindOptions, Model, UpdateOptions } from 'sequelize';
import { injectable } from 'inversify';

@injectable()
export class BaseRepository<T extends Model<T>> {
  constructor(protected model: { new (): T } & typeof Model) {}

  async create(attributes: any, options: CreateOptions<T> = {}) {
    return this.model.create<T>(attributes, options);
  }

  async findAll(options: FindOptions<T> = {}) {
    return this.model.findAll<T>(options);
  }

  async findOne(options: FindOptions<T>) {
    return this.model.findOne<T>(options);
  }

  async findAndUpdate(attributes: Partial<T>, options: UpdateOptions<T>) {
    return this.model.update<T>(attributes, { ...options, returning: true });
  }

  async findAndDelete(options: DestroyOptions<T> = {}) {
    return this.model.destroy<T>(options);
  }
}
