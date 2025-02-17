import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
class UserPreferencesNotifications {
  @Prop()
  email: boolean;

  @Prop()
  webhook: string;

  @Prop()
  apiKey: string;
}

@Schema()
class UserPreferences {
  @Prop({ type: UserPreferencesNotifications })
  notifications: UserPreferencesNotifications;

  @Prop([String])
  categories: string[];
}

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  user_id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, unique: true, minlength: 5 })
  user_email: string;

  @Prop({ required: true })
  user_password: string;

  @Prop({ required: true, enum: ['admin', 'user'] })
  user_role: string;

  @Prop({ type: UserPreferences, required: true })
  user_preferences: UserPreferences;
}

export const UserSchema = SchemaFactory.createForClass(User); 