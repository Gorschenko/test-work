import { Transport } from '@nestjs/microservices';
import { IKafkaService, KafkaServiceName } from '../data';

export class UsersService implements IKafkaService {
  name: string;
  transport: Transport.KAFKA;
  options: {
    client: {
      brokers: string[];
      clientId: string;
    };
    consumer: {
      groupId: string;
    };
  };

  constructor() {
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
