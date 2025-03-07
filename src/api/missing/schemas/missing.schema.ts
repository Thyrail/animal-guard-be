import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MissingPost extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [String] })
    imageUploads: string[];
    
    @Prop({ type: [String] })
    imageUrls: string[];

    @Prop()
    breed?: string;

    @Prop()
    colour?: string;

    @Prop()
    chipped?: boolean;
}

export const MissingPostSchema = SchemaFactory.createForClass(MissingPost);