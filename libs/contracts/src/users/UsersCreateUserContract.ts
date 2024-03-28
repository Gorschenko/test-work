import { IUser } from '@app/types';
import { CreateUserDto } from '../dtos/users/CreateUserDto';

export class UsersCreateUserResponseBody {
  user: IUser;
}

export class UsersCreateUserRequestBody extends CreateUserDto {}

export namespace UsersCreateUserContract {
  export const topic = 'create.user';

  export class RequestBody extends UsersCreateUserRequestBody {}

  export class ResponseBody extends UsersCreateUserResponseBody {}
}
