import { Transport } from '@nestjs/microservices';
import { IKafkaService } from '../data';

export class BaseService implements IKafkaService {
  name: string;
  transport: Transport.KAFKA;
  options: {
    client?: {
      brokers: string[];
      clientId?: string;
    };
    consumer?: {
      groupId: string;
    };
  };

  setClientId(id: string) {
    this.options.client.clientId = id;
    return this;
  }
}
