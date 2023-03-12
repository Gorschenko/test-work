import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsString, ValidateNested } from 'class-validator';
import { EditCityDto } from '../../city/dto/edit.city.dto';

export class CreateListDto {
  @IsString()
  shortName: string;

  @IsString()
  fullName: string;

  @IsString()
  color: string;

  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @Type(() => EditCityDto)
  cities: EditCityDto[];
}
