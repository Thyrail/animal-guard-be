import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document
{
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop()
    title?: string;

    @Prop({ enum: ['Herr', 'Frau'], default: null })
    salutation?: string;

    @Prop()
    birthPlace?: string;

    @Prop()
    birthDate?: Date;

    @Prop({
        type: {
            street: { type: String, default: null },
            houseNumber: { type: String, default: null },
            postalCode: { type: String, default: null },
            city: { type: String, default: null },
        },
    })
    address?: Record<string, string>;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ unique: true })
    username?: string;

    @Prop()
    phone?: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: false })
    isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);