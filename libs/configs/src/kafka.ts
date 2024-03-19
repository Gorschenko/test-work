import { IKafkaService } from '@app/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProvider, ClientsProviderAsyncOptions } from '@nestjs/microservices';

export const getKafkaOptions = (clients: IKafkaService[]): ClientsProviderAsyncOptions[] => {
  return clients.map((c) => ({
    name: c.name,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => setKafkaOptions(configService, c),
  }));
};

export const setKafkaOptions = (
  configService: ConfigService,
  client: IKafkaService,
): ClientProvider => {
  const KAFKA_HOST = configService.get('KAFKA_HOST');
  const KAFKA_PORT = configService.get('KAFKA_PORT');
  const broker = KAFKA_HOST + ':' + KAFKA_PORT;
  client.options.client.brokers = [broker];
  return client;
};
