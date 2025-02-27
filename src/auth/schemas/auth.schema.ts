import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class LoginAttempt extends Document
{
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    success: boolean;

    @Prop()
    ip?: string; //* Optional: IP-Adresse speichern

    @Prop()
    userAgent?: string; //* Optional: User-Agent speichern (Browser, Gerät)
}

export const LoginAttemptSchema = SchemaFactory.createForClass(LoginAttempt);