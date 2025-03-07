import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './schemas/upload.schema';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';


@Module({
    imports: [MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }])],
    controllers: [UploadController],
    providers: [UploadService],
    exports: [UploadService],
})

export class UploadModule { }