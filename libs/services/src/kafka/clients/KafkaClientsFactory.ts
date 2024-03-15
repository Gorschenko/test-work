import { ClientProviderOptions } from '@nestjs/microservices';
import { KafkaService } from '../data';
import { KafkaUsersClient } from './KafkaUsersClient';

export class KafkaClientsFactory {
  create(serviceName: KafkaService): ClientProviderOptions {
    switch (serviceName) {
      case KafkaService.USERS:
        return new KafkaUsersClient();
    }
  }
}
