import { Injectable } from '@nestjs/common';
import { Model } from 'sequelize-typescript';

@Injectable()
export class SequelizeRepository<T extends Model> {}
