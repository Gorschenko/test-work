import { Transport } from '@nestjs/microservices';
import { KafkaService } from '../data';
import { ConsumerConfig, KafkaConfig } from 'kafkajs';

export class KafkaUsersClient {
  public name: KafkaService;
  public transport: Transport.KAFKA;
  public options: {
    client: KafkaConfig;
    consumer: ConsumerConfig;
  };

  constructor() {
    this.name = KafkaService.USERS;
    this.transport = Transport.KAFKA;
    this.options = {
      client: {
        clientId: 'users',
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'users-consumer',
      },
    };
  }
}
