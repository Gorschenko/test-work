import { IsNumberString, IsString } from 'class-validator';

export class LocalEnvConfig {
  @IsString()
  KAFKA_HOST: number;

  @IsNumberString()
  KAFKA_PORT: number;
}
