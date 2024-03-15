import { IsNumberString } from 'class-validator';

export class LocalEnvConfig {
  @IsNumberString()
  APP_PORT: number;
}
