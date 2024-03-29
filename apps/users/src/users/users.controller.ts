import { UsersGetAllUsersContract } from '@app/contracts';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UsersController {
  @MessagePattern(UsersGetAllUsersContract.topic)
  getUsers() {
    console.log('hello from users service');
    return {};
  }
}
