import { IUser } from '@app/types';

export class UsersGetAllUsersResponseBody {
  users: IUser[];
}

export namespace UsersGetAllUsersContract {
  export const topic = 'get.all.users';

  export class ResponseBody extends UsersGetAllUsersResponseBody {}
}
