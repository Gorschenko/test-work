import { GatewayGetAllUsersContract, ROUTES, UsersGetAllUsersContract } from '@app/contracts';
import { KafkaServiceName } from '@app/services';
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller(ROUTES.USERS)
export class UsersController implements OnModuleInit {
  constructor(@Inject(KafkaServiceName.USERS) private client: ClientKafka) {}
  onModuleInit() {
    this.client.subscribeToResponseOf(UsersGetAllUsersContract.topic);
    this.client.connect();
  }
  @Get(GatewayGetAllUsersContract.path)
  getUsers() {
    return this.client.send<UsersGetAllUsersContract.ResponseBody, unknown>(
      UsersGetAllUsersContract.topic,
      '',
    );
  }
}
