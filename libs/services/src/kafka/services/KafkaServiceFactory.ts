import { IKafkaService, KafkaServiceName } from '../data';
import { UsersService } from './UsersService';

export class KafkaServicesFactory {
  create(name: string): IKafkaService {
    switch (name) {
      case KafkaServiceName.USERS:
        return new UsersService();
    }
  }
}
