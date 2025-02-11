import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Article } from '../../schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name) private articleModel: Model<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    // Vérifier si l'article existe déjà (basé sur le titre et la source)
    const existingArticle = await this.articleModel.findOne({
      title: createArticleDto.title,
      source: createArticleDto.source
    });

    if (existingArticle) {
      throw new BadRequestException('Article already exists');
    }

    const article = new this.articleModel({
      ...createArticleDto,
      publishedAt: createArticleDto.publishedAt || new Date(),
      moderate: createArticleDto.moderate || false
    });

    return (await article.save()).toObject({ versionKey: false });
  }

  async findAll(filters: {
    category?: string;
    tags?: string[];
    moderate?: boolean;
    source?: string;
  } = {}): Promise<Article[]> {
    const query: any = {};

    if (filters.category) {
      query.category = filters.category;
    }
    if (filters.tags?.length) {
      query.tags = { $in: filters.tags };
    }
    if (typeof filters.moderate === 'boolean') {
      query.moderate = filters.moderate;
    }
    if (filters.source) {
      query.source = filters.source;
    }

    return this.articleModel
      .find(query)
      .sort({ publishedAt: -1 })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid article ID');
    }

    const article = await this.articleModel
      .findById(id)
      .lean()
      .exec();

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async update(id: string, updateData: Partial<CreateArticleDto>): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid article ID');
    }

    const article = await this.articleModel
      .findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      )
      .lean()
      .exec();

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid article ID');
    }

    const result = await this.articleModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Article not found');
    }
  }

  async findByCategories(categories: string[]): Promise<Article[]> {
    return this.articleModel
      .find({ category: { $in: categories } })
      .sort({ publishedAt: -1 })
      .lean()
      .exec();
  }

  async findByTags(tags: string[]): Promise<Article[]> {
    return this.articleModel
      .find({ tags: { $in: tags } })
      .sort({ publishedAt: -1 })
      .lean()
      .exec();
  }

  async moderateArticle(id: string, moderate: boolean): Promise<Article> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid article ID');
    }

    const article = await this.articleModel
      .findByIdAndUpdate(
        id,
        { $set: { moderate } },
        { new: true }
      )
      .lean()
      .exec();

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    return article;
  }
} 