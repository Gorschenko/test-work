import { SequelizeRepository, UserModel } from '@app/database';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class UsersRepository extends SequelizeRepository<UserModel> {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
    private readonly sequelize: Sequelize,
  ) {
    super(UserModel);
  }
}
