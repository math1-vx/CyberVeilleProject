import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Webhook extends Document {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  url: string;

  @Prop({ default: true })
  active: boolean;
}