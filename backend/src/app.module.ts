import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { Article, ArticleSchema } from './schemas/article.schema';
import { Subscription, SubscriptionSchema } from './schemas/subscription.schema';
import { ScrapingLog, ScrapingLogSchema } from './schemas/scraping-log.schema';
import { Like, LikeSchema } from './schemas/like.schema';
import { UsersModule } from './modules/users/users.module';
import { ArticlesModule } from './modules/articles/articles.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { ScrapingLogsModule } from './modules/scraping-logs/scraping-logs.module';
import { LikesModule } from './modules/likes/likes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ArticlesModule,
    SubscriptionsModule,
    ScrapingLogsModule,
    LikesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

