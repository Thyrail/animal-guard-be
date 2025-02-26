import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop()
    picture?: string;

    @Prop({ required: true })
    time: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    location: string;

    @Prop({ required: true })
    postalCode: string;
}

export const EventSchema = SchemaFactory.createForClass(Event);