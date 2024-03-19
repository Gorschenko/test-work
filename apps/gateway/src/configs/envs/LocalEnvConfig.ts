import { IsNumberString, IsString } from 'class-validator';

export class LocalEnvConfig {
  @IsNumberString()
  APP_PORT: number;

  @IsString()
  KAFKA_HOST: number;

  @IsNumberString()
  KAFKA_PORT: number;
}
