import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './schemas/news.schema';
import { CreateNewsDto, UpdateNewsDto } from './dto/news.dto';

@Injectable()
export class NewsService
{
    constructor(@InjectModel(News.name) private model: Model<News>) { }

    create(dto: CreateNewsDto)
    {
        return new this.model(dto).save();
    }

    findAll()
    {
        return this.model.find().exec();
    }

    findOne(id: string)
    {
        return this.model.findById(id).exec();
    }

    update(id: string, dto: UpdateNewsDto)
    {
        return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    remove(id: string)
    {
        return this.model.findByIdAndDelete(id).exec();
    }

}