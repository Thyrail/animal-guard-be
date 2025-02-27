import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginAttempt } from './schemas/auth.schema';

@Injectable()
export class AuthService
{
    constructor(
        private readonly userService: UserService,
        @InjectModel(LoginAttempt.name) private loginAttemptModel: Model<LoginAttempt>
    ) { }

    async validateUser(email: string, password: string, ip?: string, userAgent?: string)
    {
        //* Nutzer in der Datenbank finden
        const user = await this.userService.findByEmail(email);

        if (!user)
        {
            await this.logFailedAttempt(email, ip, userAgent);
            throw new UnauthorizedException('Benutzername oder Passwort ist falsch');
        }

        //* Passwort prüfen
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
        {
            await this.logFailedAttempt(email, ip, userAgent);
            throw new UnauthorizedException('Benutzername oder Passwort ist falsch');
        }

        //* Erfolgreichen Login speichern
        await this.loginAttemptModel.create({
            email,
            success: true,
            ip: ip || 'unknown',
            userAgent: userAgent || 'unknown',
        });

        //* JWT-Token generieren
        const token = jwt.sign(
            { userId: user._id.toString(), isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return { token, userId: user._id, isAdmin: user.isAdmin };
    }

    //* Fehlerhafte Logins loggen (Brute-Force-Schutz)
    private async logFailedAttempt(email: string, ip?: string, userAgent?: string)
    {
        await this.loginAttemptModel.create({
            email,
            success: false,
            ip: ip || 'unknown',
            userAgent: userAgent || 'unknown',
        });
    }

}