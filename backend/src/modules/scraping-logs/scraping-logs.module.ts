import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScrapingLogsController } from './scraping-logs.controller';
import { ScrapingLogsService } from './scraping-logs.service';
import { ScrapingLog, ScrapingLogSchema } from '../../schemas/scraping-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ScrapingLog.name, schema: ScrapingLogSchema }])
  ],
  controllers: [ScrapingLogsController],
  providers: [ScrapingLogsService],
  exports: [ScrapingLogsService]
})
export class ScrapingLogsModule {}