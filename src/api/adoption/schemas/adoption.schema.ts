import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

enum Gender {
    Male = 'male',
    Female = 'female',
    Unknown = 'unknown'
}

@Schema({ timestamps: true })
export class AdoptionPost extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop([String])
    images: string[];

    @Prop()
    estimatedAge?: string;

    @Prop()
    birthDate?: Date;

    @Prop()
    breed?: string;

    @Prop()
    colour?: string;

    @Prop({ type: String, enum: Gender, default: Gender.Unknown })
    gender?: Gender;

    @Prop({ type: [String] })
    specialFeatures?: string[]; //* Besondere Merkmale (z.B. Behinderung, Narben, besonderes Verhalten etc...)

    @Prop({ default: false })
    vaccinated?: boolean;

    @Prop({ default: false })
    chipped?: boolean;

    @Prop({ default: false }) //* Ob das Tier kastriert/sterilisiert ist
    neutered?: boolean;

}

export const AdoptionPostSchema = SchemaFactory.createForClass(AdoptionPost);