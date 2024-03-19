import { DynamicModule, Module } from '@nestjs/common';
import { ClientsModule, ClientsProviderAsyncOptions } from '@nestjs/microservices';

@Module({})
export class KafkaModule {
  static forRootAsync(options: ClientsProviderAsyncOptions[]): DynamicModule {
    return {
      module: KafkaModule,
      imports: [ClientsModule.registerAsync(options)],
      providers: [],
      exports: [ClientsModule],
    };
  }
}
