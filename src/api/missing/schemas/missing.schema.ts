import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class MissingPost extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop([String])
    images: string[];

    @Prop()
    breed?: string;

    @Prop()
    colour?: string;

    @Prop()
    chipped?: boolean;


}

export const MissingPostSchema = SchemaFactory.createForClass(MissingPost);