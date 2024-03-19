import { KafkaOptions } from '@nestjs/microservices';

export interface IKafkaService extends KafkaOptions {
  name: string;

  setClientId: (id: string) => this;
}

export enum KafkaServiceName {
  USERS = 'USERS_SERVICE',
}
