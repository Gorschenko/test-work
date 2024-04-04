import { CreateUserDto } from '@app/contracts';
import { ErrorCode, IUser } from '@app/types';
import { HttpStatus, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { KafkaError } from '@app/services';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createUser(data: CreateUserDto): Promise<IUser> {
    throw new KafkaError({
      status: HttpStatus.ACCEPTED,
      code: ErrorCode.INVALID_DATA,
    });
    // return this.usersRepository.create(data);
  }
}
