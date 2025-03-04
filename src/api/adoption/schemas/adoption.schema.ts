import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import moment from 'moment-timezone';

enum Gender
{
    Male = 'male',
    Female = 'female',
}

@Schema({ timestamps: true })
export class AdoptionPost extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop([String])
    images: string[];

    @Prop()
    estimatedAge?: string;

    @Prop({ type: Date, default: Date.now })
    birthDate?: Date;

    get formattedBirthDate(): string
    {
        return this.birthDate ? moment(this.birthDate).tz("Europe/Berlin").format('DD.MM.YYYY') : null;
    }

    @Prop()
    breed?: string;

    @Prop()
    colour?: string;

    @Prop()
    weight?: string;

    @Prop({ type: String, enum: Gender, required: true })
    gender: Gender;

    @Prop({ type: Map, of: String })
    specialFeatures?: Record<string, string>; //* Besondere Merkmale (z.B. Behinderung, Narben, besonderes Verhalten etc...)

    @Prop({ default: false })
    vaccinated?: boolean;

    @Prop({ default: false })
    chipped?: boolean;

    @Prop({ default: false }) //* Ob das Tier kastriert/sterilisiert ist
    neutered?: boolean;

}

export const AdoptionPostSchema = SchemaFactory.createForClass(AdoptionPost);