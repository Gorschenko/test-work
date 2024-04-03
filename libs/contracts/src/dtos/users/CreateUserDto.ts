import { UserStatus } from '@app/types';
import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail({})
  email: string;

  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;
}
