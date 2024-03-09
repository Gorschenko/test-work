import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { getNotEmptyError, getNumberError, getStringError } from '../../filters/errorsStrings';
import { ICity } from '../../types/CityInterface';

export namespace UpdateCityContract {
  export const path = '/:cityId';
  export const method = 'patch';

  export class RequestParams {
    @IsNotEmpty(getNotEmptyError('cityId'))
    @IsNumberString({}, getNumberError('cityId'))
    cityId?: number;
  }

  export class RequestBody {
    @IsOptional()
    @IsNotEmpty(getNotEmptyError('name'))
    @IsString(getStringError('name'))
    name?: string;

    @IsOptional()
    @IsNotEmpty(getNotEmptyError('foundedAt'))
    @IsString(getStringError('foundedAt'))
    foundedAt?: string;
  }

  export class ResponseBody {}
}
