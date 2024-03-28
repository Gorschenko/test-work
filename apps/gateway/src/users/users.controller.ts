import {
  GatewayCreateUserContract,
  GatewayGetAllUsersContract,
  ROUTES,
  UsersGetAllUsersContract,
  UsersCreateUserContract,
} from '@app/contracts';
import { KafkaServiceName } from '@app/services';
import { Body, Controller, Get, Inject, OnModuleInit, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller(ROUTES.USERS)
export class UsersController implements OnModuleInit {
  constructor(@Inject(KafkaServiceName.USERS) private client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(UsersGetAllUsersContract.topic);
    this.client.subscribeToResponseOf(UsersCreateUserContract.topic);
    this.client.connect();
  }

  @Get(GatewayGetAllUsersContract.path)
  getUsers() {
    return this.client.send<UsersGetAllUsersContract.ResponseBody, unknown>(
      UsersGetAllUsersContract.topic,
      {},
    );
  }

  @Post(GatewayCreateUserContract.path)
  createUser(@Body() body: GatewayCreateUserContract.RequestBody) {
    return this.client.send<
      UsersCreateUserContract.ResponseBody,
      UsersCreateUserContract.RequestBody
    >(UsersCreateUserContract.topic, body);
  }
}
