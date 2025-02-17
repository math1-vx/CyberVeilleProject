import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Like extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  articleId: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  likes: number;
}

export const LikeSchema = SchemaFactory.createForClass(Like);