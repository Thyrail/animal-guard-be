import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Upload } from './schemas/upload.schema';

@Injectable()
export class UploadService
{
    constructor(@InjectModel(Upload.name) private readonly uploadModel: Model<Upload>) { }

    async saveUploadedFiles(files: Express.Multer.File[])
    {
        const uploadedFiles = files.map((file) => ({
            filename: file.originalname,
            path: `/uploads/${file.filename}`,
            url: `/uploads/${file.filename}`,
            fileType: file.mimetype.startsWith('image/') ? 'image' : 'other',
            uploadedAt: new Date(),
        }));

        return this.uploadModel.insertMany(uploadedFiles);
    }
    
}