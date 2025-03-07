import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class News extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String] })
    imageUploads: string[];

    @Prop({ type: [String] })
    imageUrls: string[];

}

export const NewsSchema = SchemaFactory.createForClass(News);

//! successStories
/*

controller, service, schema

*/