import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ScrapingLog } from '../../schemas/scraping-log.schema';

@Injectable()
export class ScrapingLogsService {
  constructor(
    @InjectModel(ScrapingLog.name) private scrapingLogModel: Model<ScrapingLog>
  ) {}
} 