import { IsString } from 'class-validator';
import { CreateCityDto } from './create.city.dto';

export class EditCityDto extends CreateCityDto {
  @IsString()
  id: string;
}
