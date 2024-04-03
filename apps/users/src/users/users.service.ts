import { CreateUserDto } from '@app/contracts';
import { IUser } from '@app/types';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    return this.usersRepository.create(data);
  }
}
