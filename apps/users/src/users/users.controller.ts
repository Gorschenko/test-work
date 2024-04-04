import { UsersCreateUserContract, UsersGetAllUsersContract } from '@app/contracts';
import { Controller, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { KafkaExceptionFilter, KafkaServiceName } from '@app/services';

@Controller()
@UseFilters(new KafkaExceptionFilter({ serviceName: KafkaServiceName.USERS }))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(UsersGetAllUsersContract.topic)
  getUsers() {
    console.log('hello from users service');
    return {};
  }

  @MessagePattern(UsersCreateUserContract.topic)
  async createUser(
    @Payload() data: UsersCreateUserContract.RequestBody,
  ): Promise<UsersCreateUserContract.ResponseBody> {
    const user = await this.usersService.createUser(data);

    return {
      user,
    };
  }
}
