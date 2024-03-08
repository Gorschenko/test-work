import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { getNotEmptyError, getStringError } from '../../filters/errorsStrings';
import { ICity } from '../../types/CityInterface';

export namespace GetAllCitiesContract {
  export const path = '/';
  export const method = 'get';

  export class RequestQuery {
    @IsOptional()
    @IsNotEmpty(getNotEmptyError('name'))
    @IsString(getStringError('name'))
    name?: string;
  }

  export class ResponseBody {
    cities: ICity[];
  }
}
