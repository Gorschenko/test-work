import { DynamicModule, Module } from '@nestjs/common';
import { ClientProviderOptions, ClientsModule } from '@nestjs/microservices';
import { IKafkaConfig, KafkaService } from './data';
import { KafkaClientsFactory } from './clients/KafkaClientsFactory';

@Module({})
export class KafkaModule {
  static register(config: IKafkaConfig): DynamicModule {
    const clients = this.getClients(config.clients);

    return {
      module: KafkaModule,
      imports: [ClientsModule.register(clients)],
      exports: [ClientsModule],
    };
  }

  static getClients(services: KafkaService[]): ClientProviderOptions[] {
    const clientsFactory = new KafkaClientsFactory();
    return services.map((s) => clientsFactory.create(s));
  }
}
