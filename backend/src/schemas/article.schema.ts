import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Article extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  source: string;

  @Prop()
  content: string;

  @Prop([String])
  category: string[];

  @Prop([String])
  tags: string[];

  @Prop()
  publishedAt: Date;

  @Prop()
  moderate: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article); 