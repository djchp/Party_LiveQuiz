import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { AccountType } from '../schema/user.schema';

export class createUserDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(AccountType)
  accountType: AccountType
}

export class logInDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
