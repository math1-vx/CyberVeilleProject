import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto implements Partial<CreateArticleDto> {
  title?: string;
  source?: string;
  content?: string;
  category?: string[];
  tags?: string[];
  publishedAt?: Date;
  moderate?: boolean;
} 