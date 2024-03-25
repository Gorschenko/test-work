import { Transport } from '@nestjs/microservices';
import { IKafkaService } from '../data';

// Only for types
export class BaseService implements IKafkaService {
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
}
