import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Like } from '../../schemas/like.schema';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private likeModel: Model<Like>
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const existingLike = await this.likeModel.findOne({
      articleId: createLikeDto.articleId
    });

    if (existingLike) {
      throw new BadRequestException('Like entry already exists for this article');
    }

    const like = new this.likeModel(createLikeDto);
    return (await like.save()).toObject({ versionKey: false });
  }

  async findAll(): Promise<Like[]> {
    return this.likeModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Like> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid like ID');
    }

    const like = await this.likeModel
      .findById(id)
      .lean()
      .exec();

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    return like;
  }

  async findByArticleId(articleId: string): Promise<Like> {
    if (!Types.ObjectId.isValid(articleId)) {
      throw new BadRequestException('Invalid article ID');
    }

    const like = await this.likeModel
      .findOne({ articleId: new Types.ObjectId(articleId) })
      .lean()
      .exec();

    if (!like) {
      throw new NotFoundException('Like not found for this article');
    }

    return like;
  }

  async incrementLike(articleId: string): Promise<Like> {
    if (!Types.ObjectId.isValid(articleId)) {
      throw new BadRequestException('Invalid article ID');
    }

    const like = await this.likeModel
      .findOneAndUpdate(
        { articleId: new Types.ObjectId(articleId) },
        { $inc: { likes: 1 } },
        { new: true, upsert: true }
      )
      .lean()
      .exec();

    return like;
  }

  async decrementLike(articleId: string): Promise<Like> {
    if (!Types.ObjectId.isValid(articleId)) {
      throw new BadRequestException('Invalid article ID');
    }

    const like = await this.likeModel
      .findOneAndUpdate(
        { 
          articleId: new Types.ObjectId(articleId),
          likes: { $gt: 0 }
        },
        { $inc: { likes: -1 } },
        { new: true }
      )
      .lean()
      .exec();

    if (!like) {
      throw new BadRequestException('Cannot decrement likes below 0');
    }

    return like;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid like ID');
    }

    const result = await this.likeModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Like not found');
    }
  }
}