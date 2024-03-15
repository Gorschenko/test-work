import { ROUTES } from '@app/contracts';
import { Controller } from '@nestjs/common';

@Controller(ROUTES.USERS)
export class UsersController {
  constructor() {}
}
