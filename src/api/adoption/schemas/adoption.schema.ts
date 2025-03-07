import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import moment from 'moment-timezone';


@Schema({ timestamps: true })
export class AdoptionPost extends Document
{
    @Prop({ required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string;

    //? Multer muss hinzugefügt werden um Images von lokal auf den Server hochzuladen
    @Prop({ type: [String]})
    imageUploads: string[];

    @Prop({ type: [String]})
    imageUrls: string[];

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

    @Prop({ type: String, required: false })
    gender: string;

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