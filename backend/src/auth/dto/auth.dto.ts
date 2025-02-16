import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  user_password: string;
}

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  user_password: string;

  @IsString()
  @IsNotEmpty()
  user_role: 'user' | 'admin' = 'user';
} 