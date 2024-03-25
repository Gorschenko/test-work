import { KafkaOptions } from '@nestjs/microservices';

export interface IKafkaService extends KafkaOptions {
  name: string;
}

export enum KafkaServiceName {
  USERS = 'USERS_SERVICE',
}
