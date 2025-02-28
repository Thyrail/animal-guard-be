import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdoptionPost, AdoptionPostSchema } from './schemas/adoption.schema';
import { AdoptionService } from './adoption.service';
import { AdoptionController } from './adoption.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AdoptionPost.name, schema: AdoptionPostSchema }])
    ],
    controllers: [AdoptionController],
    providers: [AdoptionService],
    exports: [AdoptionService],
})

export class AdoptionModule { }