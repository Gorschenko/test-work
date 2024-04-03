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
import { lastValueFrom } from 'rxjs';

@Controller(ROUTES.USERS)
export class UsersController implements OnModuleInit {
  constructor(@Inject(KafkaServiceName.USERS) private client: ClientKafka) {}

  onModuleInit() {
    this.client.subscribeToResponseOf(UsersGetAllUsersContract.topic);
    this.client.subscribeToResponseOf(UsersCreateUserContract.topic);
    this.client.connect();
  }

  @Get(GatewayGetAllUsersContract.path)
  async getUsers(): Promise<GatewayGetAllUsersContract.ResponseBody> {
    const { users } = await lastValueFrom(
      this.client.send<UsersGetAllUsersContract.ResponseBody, unknown>(
        UsersGetAllUsersContract.topic,
        {},
      ),
    );
    return {
      users,
    };
  }

  @Post(GatewayCreateUserContract.path)
  async createUser(
    @Body() body: GatewayCreateUserContract.RequestBody,
  ): Promise<GatewayCreateUserContract.ResponseBody> {
    const { user } = await lastValueFrom(
      this.client.send<UsersCreateUserContract.ResponseBody, UsersCreateUserContract.RequestBody>(
        UsersCreateUserContract.topic,
        body,
      ),
    );
    return { user };
  }
}
