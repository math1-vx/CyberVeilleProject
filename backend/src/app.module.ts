import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { ScrapingModule } from './modules/scraping/scraping.module';
import { SearchModule } from './modules/search/search.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { ApiModule } from './modules/api/api.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { TasksModule } from './modules/tasks/tasks.module';
@Module({
  imports: [UsersModule, ArticlesModule, ScrapingModule, SearchModule, SubscriptionsModule, ApiModule, NotificationsModule, TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
