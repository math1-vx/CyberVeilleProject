import { IsNotEmpty, IsString, IsEnum, IsOptional, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateScrapingLogDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsEnum(['success', 'failed'])
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsOptional()
  errorMessage?: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  scrapedAt?: Date;
} 