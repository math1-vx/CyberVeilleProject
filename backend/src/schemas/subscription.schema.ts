import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Subscription extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  userId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true, enum: ['email', 'webhook', 'api'] })
  type: string;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
