import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';

@Injectable()
export class EventService
{
    constructor(@InjectModel(Event.name) private model: Model<Event>) { }

    create(dto: CreateEventDto)
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

    update(id: string, dto: UpdateEventDto)
    {
        return this.model.findByIdAndUpdate(id, dto, { new: true }).exec();
    }

    remove(id: string)
    {
        return this.model.findByIdAndDelete(id).exec();
    }

}