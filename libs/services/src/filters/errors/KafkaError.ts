import { ErrorCode } from '@app/types';
import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export interface IKafkaErrorOptions {
  status: HttpStatus;
  code: ErrorCode;
  message?: string;
  topic?: string;
  serviceName?: string;
}

export class KafkaError extends RpcException {
  constructor(e: IKafkaErrorOptions) {
    super(e);
  }
}
