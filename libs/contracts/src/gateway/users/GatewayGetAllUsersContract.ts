import { IUser } from '@app/types';

export class GatewayGetAllUsersResponseBody {
  users: IUser[];
}

export namespace GatewayGetAllUsersContract {
  export const path = '';
  export const method = 'get';

  export class ResponseBody extends GatewayGetAllUsersResponseBody {}
}
