import { IsNotEmpty, IsNumber, IsMongoId, Min } from 'class-validator';
import { Types } from 'mongoose';

export class CreateLikeDto {
  @IsMongoId()
  @IsNotEmpty()
  articleId: Types.ObjectId;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  likes: number;
} 