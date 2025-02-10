import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subscription } from '../../schemas/subscription.schema';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>
  ) {}

  async create(createSubscriptionDto: CreateSubscriptionDto): Promise<Subscription> {
    // Vérifier si l'abonnement existe déjà
    const existingSubscription = await this.subscriptionModel.findOne({
      userId: createSubscriptionDto.userId,
      category: createSubscriptionDto.category,
      type: createSubscriptionDto.type
    });

    if (existingSubscription) {
      throw new BadRequestException('Subscription already exists');
    }

    const subscription = new this.subscriptionModel(createSubscriptionDto);
    return (await subscription.save()).toObject({ versionKey: false });
  }

  async findAll(): Promise<Subscription[]> {
    return this.subscriptionModel.find().lean().exec();
  }

  async findByUserId(userId: string): Promise<Subscription[]> {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid user ID');
    }
    return this.subscriptionModel
      .find({ userId: new Types.ObjectId(userId) })
      .lean()
      .exec();
  }

  async findByCategory(category: string): Promise<Subscription[]> {
    return this.subscriptionModel
      .find({ category })
      .lean()
      .exec();
  }

  async findByType(type: string): Promise<Subscription[]> {
    return this.subscriptionModel
      .find({ type })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<Subscription> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid subscription ID');
    }

    const subscription = await this.subscriptionModel
      .findById(id)
      .lean()
      .exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async update(
    id: string, 
    updateData: Partial<CreateSubscriptionDto>
  ): Promise<Subscription> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid subscription ID');
    }

    const subscription = await this.subscriptionModel
      .findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
      .lean()
      .exec();

    if (!subscription) {
      throw new NotFoundException('Subscription not found');
    }

    return subscription;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid subscription ID');
    }

    const result = await this.subscriptionModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Subscription not found');
    }
  }
} 