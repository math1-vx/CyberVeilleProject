import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto);
  }

  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.likesService.findOne(id);
  }

  @Get('article/:articleId')
  findByArticleId(@Param('articleId') articleId: string) {
    return this.likesService.findByArticleId(articleId);
  }

  @Put('article/:articleId/increment')
  incrementLike(@Param('articleId') articleId: string) {
    return this.likesService.incrementLike(articleId);
  }

  @Put('article/:articleId/decrement')
  decrementLike(@Param('articleId') articleId: string) {
    return this.likesService.decrementLike(articleId);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.likesService.remove(id);
  }
}