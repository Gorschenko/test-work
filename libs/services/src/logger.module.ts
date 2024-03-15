import { Global, Injectable, Logger, Module } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {}

@Global()
@Module({
  providers: [LoggerService],
  exports: [LoggerService],
})
export class LoggerModule {}
