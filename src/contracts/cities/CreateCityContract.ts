import { IsNotEmpty, IsString } from 'class-validator';
import { getNotEmptyError, getStringError } from '../../filters/errorsStrings';
import { ICity } from '../../types/CityInterface';

export namespace CreateCityContract {
  export const path = '/';
  export const method = 'post';

  export class RequestBody {
    @IsNotEmpty(getNotEmptyError('name'))
    @IsString(getStringError('name'))
    name: string;

    @IsNotEmpty(getNotEmptyError('foundedAt'))
    @IsString(getStringError('foundedAt'))
    foundedAt: string;
  }

  export class ResponseBody {
    city: ICity;
  }
}
