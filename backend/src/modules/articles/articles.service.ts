import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article } from '../../schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>
  ) {}
} 