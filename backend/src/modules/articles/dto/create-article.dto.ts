import { IsString, IsArray, IsDate, IsBoolean, IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  content: string;

  @IsArray()
  @IsString({ each: true })
  category: string[];

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsDate()
  publishedAt: Date;

  @IsBoolean()
  moderate: boolean;
} 