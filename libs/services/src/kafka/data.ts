export enum KafkaService {
  USERS = 'USERS_SERVICE',
}

export interface IKafkaClient {
  name: string;
  clientId: string;
  groupId: string;
}

export interface IKafkaConfig {
  services: KafkaService[];
}
