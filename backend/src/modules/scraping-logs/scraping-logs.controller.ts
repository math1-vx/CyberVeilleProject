import { Controller } from '@nestjs/common';
import { ScrapingLogsService } from './scraping-logs.service';

@Controller('scraping-logs')
export class ScrapingLogsController {
  constructor(private readonly scrapingLogsService: ScrapingLogsService) {}
} 