import { IsNumberString, IsString } from 'class-validator';

export class LocalEnvConfig {
  @IsString()
  KAFKA_HOST: string;

  @IsNumberString()
  KAFKA_PORT: number;

  @IsString()
  MYSQL_HOST: string;

  @IsNumberString()
  MYSQL_PORT: number;

  @IsString()
  MYSQL_USERNAME: string;

  @IsString()
  MYSQL_PASSWORD: string;

  @IsString()
  MYSQL_DATABASE: string;
}
