import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Event extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String]})
    images: string[];

    @Prop({ type: [String]})
    imageUrls: string[];

    @Prop()
    time: string;

    @Prop()
    date: Date;

    @Prop()
    location: string;

    @Prop()
    postalCode: string;
    
}

export const EventSchema = SchemaFactory.createForClass(Event);