import { IsNotEmpty, IsNumberString, IsOptional, IsString } from 'class-validator';
import { getNotEmptyError, getNumberError, getStringError } from '../../filters/errorsStrings';

export namespace DeleteCityContract {
  export const path = '/:cityId?';
  export const method = 'delete';

  export class RequestParams {
    @IsOptional()
    @IsNotEmpty(getNotEmptyError('cityId'))
    @IsNumberString({}, getNumberError('cityId'))
    cityId?: number;
  }

  export class RequestQuery {
    @IsOptional()
    @IsNotEmpty(getNotEmptyError('name'))
    @IsString(getStringError('name'))
    name?: string;
  }

  export class ResponseBody {
    count: number;
  }
}
