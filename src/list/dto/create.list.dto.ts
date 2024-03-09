import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsString, ValidateNested } from 'class-validator';

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
  @Type(() => CreateListDto)
  cities: [];
}
