import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ScrapingLogsService } from './scraping-logs.service';
import { CreateScrapingLogDto } from './dto/create-scraping-log.dto';

@Controller('scraping-logs')
export class ScrapingLogsController {
  constructor(private readonly scrapingLogsService: ScrapingLogsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createScrapingLogDto: CreateScrapingLogDto) {
    return this.scrapingLogsService.create(createScrapingLogDto);
  }

  @Get()
  findAll(
    @Query('source') source?: string,
    @Query('status') status?: 'success' | 'failed',
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.scrapingLogsService.findAll({
      source,
      status,
      startDate,
      endDate,
    });
  }

  @Get('statistics')
  getStatistics(
    @Query('startDate') startDate?: Date,
    @Query('endDate') endDate?: Date,
  ) {
    return this.scrapingLogsService.getStatistics(startDate, endDate);
  }

  @Get('source/:source/latest')
  findLatestBySource(@Param('source') source: string) {
    return this.scrapingLogsService.findLatestBySource(source);
  }

  @Get('source/:source')
  findBySource(@Param('source') source: string) {
    return this.scrapingLogsService.findBySource(source);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scrapingLogsService.findOne(id);
  }

  @Delete('clear-old')
  @HttpCode(HttpStatus.OK)
  clearOldLogs(@Query('daysToKeep') daysToKeep: number) {
    return this.scrapingLogsService.clearOldLogs(daysToKeep);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.scrapingLogsService.remove(id);
  }
} 