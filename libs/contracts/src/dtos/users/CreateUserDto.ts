import { UserStatus } from '@app/types';
import { IsString, IsEmail, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail({})
  email: string;

  @IsEnum(UserStatus)
  status: UserStatus;
}
