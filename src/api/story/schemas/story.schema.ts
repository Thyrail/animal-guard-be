import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true})
export class Story extends Document
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

export const StorySchema = SchemaFactory.createForClass(Story);