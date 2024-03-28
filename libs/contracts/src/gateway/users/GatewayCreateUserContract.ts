import { CreateUserDto } from '@app/contracts';
import { IUser } from '@app/types';

export class GatewayCreateUserResponseBody {
  user: IUser;
}

export class GatewayCreateUserRequestBody extends CreateUserDto {}

export namespace GatewayCreateUserContract {
  export const path = '';
  export const method = 'post';

  export class RequestBody extends GatewayCreateUserRequestBody {}

  export class ResponseBody extends GatewayCreateUserResponseBody {}
}
