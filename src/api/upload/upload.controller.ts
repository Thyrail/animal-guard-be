import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from '../config/multer.config';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController
{
    constructor(private readonly uploadService: UploadService) { }

    @Post()
    @UseInterceptors(FileInterceptor('file', multerConfig))
    uploadFile(@UploadedFile() file: Express.Multer.File)
    {
        return { imageUrl: this.uploadService.getFileUrl(file) };
    }

}