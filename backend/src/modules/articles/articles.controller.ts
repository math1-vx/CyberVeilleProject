import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from '../../schemas/article.schema';
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';

@Controller('articles')
@UseGuards(RolesGuard)
export class ArticlesController {

    constructor(private readonly articlesService: ArticlesService) {}

    @Post()
    @Roles('admin')
    create(@Body() createArticleDto: CreateArticleDto): Promise<Article> {
        return this.articlesService.create(createArticleDto);
    }

    @Get()
    findAll(@Query('category') category?: string): Promise<Article[]> {
        if (category) {
            return this.articlesService.findByCategory(category);
        }
        return this.articlesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Article> {
        return this.articlesService.findOne(id);
    }

    @Patch(':id')
    @Roles('admin')
    update(
        @Param('id') id: string,
        @Body() updateArticleDto: UpdateArticleDto,
    ): Promise<Article> {
        return this.articlesService.update(id, updateArticleDto);
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id') id: string): Promise<Article> {
        return this.articlesService.remove(id);
    }
}
