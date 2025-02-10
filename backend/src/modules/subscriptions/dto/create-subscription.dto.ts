import { IsNotEmpty, IsString, IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CreateSubscriptionDto {
  @IsMongoId()
  @IsNotEmpty()
  userId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsEnum(['email', 'webhook', 'api'])
  @IsNotEmpty()
  type: string;
} 