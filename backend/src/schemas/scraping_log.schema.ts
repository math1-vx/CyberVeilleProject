import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class ScrapingLog extends Document {
  @Prop({ required: true })
  source: string;

  @Prop({ enum: ['success', 'failed'] })
  status: string;

  @Prop()
  errorMessage: string;

  @Prop()
  scrapedAt: Date;
}

export const ScrapingLogSchema = SchemaFactory.createForClass(ScrapingLog); 