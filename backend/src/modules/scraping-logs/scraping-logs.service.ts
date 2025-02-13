import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ScrapingLog } from '../../schemas/scraping-log.schema';
import { CreateScrapingLogDto } from './dto/create-scraping-log.dto';

@Injectable()
export class ScrapingLogsService {
  constructor(
    @InjectModel(ScrapingLog.name) private scrapingLogModel: Model<ScrapingLog>
  ) {}

  async create(createScrapingLogDto: CreateScrapingLogDto): Promise<ScrapingLog> {
    const scrapingLog = new this.scrapingLogModel({
      ...createScrapingLogDto,
      scrapedAt: createScrapingLogDto.scrapedAt || new Date()
    });

    return (await scrapingLog.save()).toObject({ versionKey: false });
  }

  async findAll(filters: {
    source?: string;
    status?: 'success' | 'failed';
    startDate?: Date;
    endDate?: Date;
  } = {}): Promise<ScrapingLog[]> {
    const query: any = {};

    if (filters.source) {
      query.source = filters.source;
    }
    if (filters.status) {
      query.status = filters.status;
    }
    if (filters.startDate || filters.endDate) {
      query.scrapedAt = {};
      if (filters.startDate) {
        query.scrapedAt.$gte = filters.startDate;
      }
      if (filters.endDate) {
        query.scrapedAt.$lte = filters.endDate;
      }
    }

    return this.scrapingLogModel
      .find(query)
      .sort({ scrapedAt: -1 })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<ScrapingLog> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid log ID');
    }

    const log = await this.scrapingLogModel
      .findById(id)
      .lean()
      .exec();

    if (!log) {
      throw new NotFoundException('Log not found');
    }

    return log;
  }

  async findBySource(source: string): Promise<ScrapingLog[]> {
    return this.scrapingLogModel
      .find({ source })
      .sort({ scrapedAt: -1 })
      .lean()
      .exec();
  }

  async findLatestBySource(source: string): Promise<ScrapingLog | null> {
    return this.scrapingLogModel
      .findOne({ source })
      .sort({ scrapedAt: -1 })
      .lean()
      .exec();
  }

  async getStatistics(startDate?: Date, endDate?: Date) {
    const query: any = {};
    if (startDate || endDate) {
      query.scrapedAt = {};
      if (startDate) query.scrapedAt.$gte = startDate;
      if (endDate) query.scrapedAt.$lte = endDate;
    }

    const [successCount, failedCount, sourceStats] = await Promise.all([
      this.scrapingLogModel.countDocuments({ ...query, status: 'success' }),
      this.scrapingLogModel.countDocuments({ ...query, status: 'failed' }),
      this.scrapingLogModel.aggregate([
        { $match: query },
        {
          $group: {
            _id: '$source',
            totalCount: { $sum: 1 },
            successCount: {
              $sum: { $cond: [{ $eq: ['$status', 'success'] }, 1, 0] }
            },
            failedCount: {
              $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] }
            }
          }
        }
      ])
    ]);

    return {
      totalCount: successCount + failedCount,
      successCount,
      failedCount,
      sourceStats
    };
  }

  async remove(id: string): Promise<void> {
    if (!Types.ObjectId.isValid(id)) {
      throw new BadRequestException('Invalid log ID');
    }

    const result = await this.scrapingLogModel.deleteOne({ _id: id }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Log not found');
    }
  }

  async clearOldLogs(daysToKeep: number = 30): Promise<number> {
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - daysToKeep);

    const result = await this.scrapingLogModel
      .deleteMany({
        scrapedAt: { $lt: dateThreshold }
      })
      .exec();

    return result.deletedCount;
  }
} 