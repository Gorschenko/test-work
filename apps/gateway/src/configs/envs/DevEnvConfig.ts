import { IsNumberString, IsString } from 'class-validator';

export class DevEnvConfig {
  @IsNumberString()
  APP_PORT: number;

  @IsString()
  KAFKA_HOST: number;

  @IsNumberString()
  KAFKA_PORT: number;
}
