export enum KafkaService {
  USERS = 'USERS_SERVICE',
}

export interface IKafkaClient {
  name: KafkaService;
  clientId: string;
  groupId: string;
}

export interface IKafkaConfig {
  clients: KafkaService[];
}
