import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { UserRole } from '../schema/user.schema';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  readonly password: string;

  @IsNotEmpty()
  @IsPhoneNumber('NG')
  readonly contactNo: number;

  @IsString()
  readonly address: string;

  @IsNotEmpty()
  @IsEnum(UserRole, { message: 'Please Select a valid role' })
  readonly role: UserRole;
}

