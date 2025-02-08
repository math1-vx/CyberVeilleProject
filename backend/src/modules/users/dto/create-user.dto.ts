import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  user_email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  user_password: string;

  @IsEnum(['admin', 'user'])
  user_role: string;

  notifications?: {
    email?: boolean;
    webhook?: string;
    apiKey?: string;
  };

  categories?: string[];
} 