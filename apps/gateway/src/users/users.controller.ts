import { GatewayGetAllUsersContract, ROUTES, UsersGetAllUsersContract } from '@app/contracts';
import { KafkaService } from '@app/services';
import { Controller, Get, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller(ROUTES.USERS)
export class UsersController implements OnModuleInit {
  constructor(@Inject(KafkaService.USERS) private client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(UsersGetAllUsersContract.topic);
    this.client.connect();
  }

  @Get(GatewayGetAllUsersContract.path)
  getUsers() {
    // return this.client.send<unknown, UsersGetAllUsersContract.ResponseBody>(
    //   UsersGetAllUsersContract.topic,
    //   '',
    // );
  }
}
