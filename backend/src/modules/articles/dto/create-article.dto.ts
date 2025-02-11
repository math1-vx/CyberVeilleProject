import { IsNotEmpty, IsString, IsArray, IsOptional, IsBoolean, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  category: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  publishedAt: Date;

  @IsBoolean()
  @IsOptional()
  moderate: boolean = false;
} 