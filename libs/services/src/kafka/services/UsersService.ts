import { Transport } from '@nestjs/microservices';
import { KafkaServiceName } from '../data';
import { BaseService } from './BaseService';

export class UsersService extends BaseService {
  constructor() {
    super();
    this.name = KafkaServiceName.USERS;
    this.transport = Transport.KAFKA;
    this.options = {
      client: {
        clientId: 'users',
        brokers: [],
      },
      consumer: {
        groupId: 'users-consumer',
      },
    };
  }
}
