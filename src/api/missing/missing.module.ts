import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MissingPost, MissingPostSchema } from './schemas/missing.schema';
import { MissingService } from './missing.service';
import { MissingController } from './missing.controller';

@Module({
    imports: [MongooseModule.forFeature([{ name: MissingPost.name, schema: MissingPostSchema }])],
    controllers: [MissingController],
    providers: [MissingService],
})

export class MissingModule { }