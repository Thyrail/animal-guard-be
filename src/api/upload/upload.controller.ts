import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags, ApiBody } from '@nestjs/swagger';
import { multerConfig } from '../config/multer.config';

@ApiTags('Upload')
@Controller('upload')
export class UploadController
{
    @Post()
    @UseInterceptors(FilesInterceptor('imageUploads', 10, multerConfig)) // 🔹 Bis zu 10 Bilder
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                imageUploads: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' },
                },
            },
        },
    })
    uploadImages(@UploadedFiles() files: Express.Multer.File[])
    {
        console.log("📤 Received files:", files);
        return files.map((file) => `/uploads/${file.filename}`);
    }

}