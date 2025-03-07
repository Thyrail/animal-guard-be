import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdoptionPost } from './schemas/adoption.schema';
import { CreateAdoptionDto, UpdateAdoptionDto } from './dto/adoption.dto';

@Injectable()
export class AdoptionService
{
    constructor(@InjectModel(AdoptionPost.name) private model: Model<AdoptionPost>) { }

    async create(dto: CreateAdoptionDto)
    {
        const newAdoptionPost = new this.model(dto);
        return newAdoptionPost.save();
    }

    findAll()
    {
        return this.model.find().exec();
    }

    findOne(id: string)
    {
        return this.model.findById(id).exec();
    }

    update(id: string, dto: UpdateAdoptionDto)
    {
        return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    remove(id: string)
    {
        return this.model.findByIdAndDelete(id).exec();
    }

}