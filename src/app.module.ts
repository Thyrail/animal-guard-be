import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AdoptionModule } from './adoption/adoption.module';
import { EventModule } from './event/event.module';
import { MissingModule } from './missing/missing.module';
import { NewsModule } from './news/news.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdoptionModule,
    EventModule,
    MissingModule,
    NewsModule,
    UserModule,
    AuthModule,
  ],
})

export class AppModule { }