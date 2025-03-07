import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Upload extends Document
{
    @Prop({ required: true })
    filename: string;

    @Prop({ required: true })
    path: string;

    @Prop({ required: true })
    url: string;

    @Prop({ default: 'image' })
    fileType: string;

    @Prop({ default: Date.now })
    uploadedAt: Date;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);