import { IsString } from 'class-validator';

export class CreateCityDto {
  @IsString()
  name: string;

  @IsString()
  value: string;

  @IsString()
  foundedAt: string;
}
