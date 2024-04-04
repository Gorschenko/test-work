import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { IKafkaErrorOptions, KafkaError } from './errors/KafkaError';
import { KafkaContext } from '@nestjs/microservices';

interface IKafkaExceptionFilterOptions {
  serviceName: string;
}

@Catch(KafkaError)
export class KafkaExceptionFilter implements ExceptionFilter {
  serviceName: string;

  constructor(options: IKafkaExceptionFilterOptions) {
    this.serviceName = options.serviceName;
  }

  catch(e: KafkaError, host: ArgumentsHost): Observable<KafkaError> {
    const ctx = host.switchToRpc().getContext<KafkaContext>();
    const errorData = e.getError() as IKafkaErrorOptions;
    errorData.serviceName = this.serviceName;
    errorData.topic = ctx.getTopic();

    return throwError(() => errorData);
  }
}
