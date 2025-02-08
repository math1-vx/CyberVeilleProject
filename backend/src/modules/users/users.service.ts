import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({ user_email: createUserDto.user_email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.user_password, 10);
    
    const createdUser = new this.userModel({
      ...createUserDto,
      user_id: new Types.ObjectId(),
      user_password: hashedPassword,
      user_preferences: {
        notifications: {
          email: createUserDto.notifications?.email || false,
          webhook: createUserDto.notifications?.webhook || '',
          apiKey: createUserDto.notifications?.apiKey || ''
        },
        categories: createUserDto.categories || []
      }
    });

    return (await createdUser.save()).toObject({ versionKey: false });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().select('-user_password').lean().exec();
  }

  async findOne(id: string): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    const user = await this.userModel
      .findById(id)
      .select('-user_password')
      .lean()
      .exec();

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel
      .findOne({ user_email: email })
      .lean()
      .exec();
    
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateData: Partial<CreateUserDto>): Promise<User> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    if (updateData.user_password) {
      updateData.user_password = await bcrypt.hash(updateData.user_password, 10);
    }

    const updatedUser = await this.userModel
      .findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
      )
      .select('-user_password')
      .lean()
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException('Invalid ID format');
    }

    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('User not found');
    }
  }
}