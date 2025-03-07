import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService
{
    getFileUrl(file: Express.Multer.File): string
    {
        return `/uploads/${file.filename}`; //? URL zum Bild
    }
    
}