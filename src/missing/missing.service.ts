import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MissingPost } from './schemas/missing.schema';
import { CreateMissingDto, UpdateMissingDto } from './dto/missing.dto';

@Injectable()
export class MissingService
{
    constructor(@InjectModel(MissingPost.name) private model: Model<MissingPost>) { }

    create(dto: CreateMissingDto)
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

    update(id: string, dto: UpdateMissingDto)
    {
        return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    remove(id: string)
    {
        return this.model.findByIdAndDelete(id).exec();
    }

}