import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email address' })
   email: string;

  @IsNotEmpty()
  @IsString()
   password: string;
}
