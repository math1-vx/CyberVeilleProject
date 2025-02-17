import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article, ArticleSchema } from '../../schemas/article.schema';
import { RolesGuard } from '../../guards/roles.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Article.name, schema: ArticleSchema }])
  ],
  controllers: [ArticlesController],
  providers: [ArticlesService, RolesGuard]
})
export class ArticlesModule {}
