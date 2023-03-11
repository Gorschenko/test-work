import { Type } from 'class-transformer';
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { EditCityDto } from '../../city/dto/edit.city.dto';

export class CreateListDto {
  @IsString()
  shortName: string;

  @IsString()
  fullName: string;

  @IsString()
  color: string;

  @ValidateNested()
  @IsArray()
  @Type(() => EditCityDto)
  cities: EditCityDto[];
}
