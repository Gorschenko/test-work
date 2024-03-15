import { IsNumberString } from 'class-validator';

export class DevEnvConfig {
  @IsNumberString()
  APP_PORT: number;
}
