import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subscription } from '../../schemas/subscription.schema';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<Subscription>
  ) {}
} 