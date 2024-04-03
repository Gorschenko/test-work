import { UsersGetAllUsersContract } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UsersGetAllUsersContract.topic)
  getUsers() {
    console.log('hello from users service');
    return {};
  }
}
