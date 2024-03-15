import { IsNumberString } from 'class-validator';

export class ProdEnvConfig {
  @IsNumberString()
  APP_PORT: number;
}
