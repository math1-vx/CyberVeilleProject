import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('tags') tags?: string[],
    @Query('moderate') moderate?: boolean,
    @Query('source') source?: string,
  ) {
    return this.articlesService.findAll({
      category,
      tags,
      moderate,
      source,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: Partial<CreateArticleDto>) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }

  @Patch(':id/moderate')
  moderateArticle(
    @Param('id') id: string,
    @Body('moderate') moderate: boolean,
  ) {
    return this.articlesService.moderateArticle(id, moderate);
  }
}