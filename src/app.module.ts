import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdoptionModule } from './api/adoption/adoption.module';
import { EventModule } from './api/event/event.module';
import { MissingModule } from './api/missing/missing.module';
import { NewsModule } from './api/news/news.module';
import { UserModule } from './api/user/user.module';
import { AuthModule } from './auth/auth.module';
import { StoryModule } from './api/story/story.module';
import { UploadModule } from './api/upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdoptionModule,
    EventModule,
    MissingModule,
    NewsModule,
    UserModule,
    StoryModule,
    UploadModule,
    AuthModule,
  ],
})

export class AppModule { }