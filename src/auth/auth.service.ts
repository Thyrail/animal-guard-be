import { Injectable, UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from '../api/user/user.service';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginAttempt } from './schemas/auth.schema';
import { ExceptionUtils } from '../utils/exception.utils';
import { CreateUserDto } from '../api/user/dto/user.dto';

@Injectable()
export class AuthService
{
    constructor(
        private readonly userService: UserService,
        @InjectModel(LoginAttempt.name) private loginAttemptModel: Model<LoginAttempt>,
    ) { }


    //* Benutzer-Authentifizierung mit E-Mail und Passwort
    async validateUser(email: string, password: string, ip?: string, userAgent?: string)
    {
        const user = await this.userService.findByEmail(email);
        if (!user)
        {
            await this.logFailedAttempt(email, ip, userAgent);
            ExceptionUtils.userNotFound();
        }

        //* Passwort prüfen
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
        {
            await this.logFailedAttempt(email, ip, userAgent);
            ExceptionUtils.userNotFound();
        }

        //* Erfolgreichen Login speichern
        await this.loginAttemptModel.create({
            email,
            success: true,
            ip: ip || 'unknown',
            userAgent: userAgent || 'unknown',
        });

        //* JWT-Token generieren
        const token = this.generateJwtToken(user._id.toString(), user.isAdmin);

        return { token, userId: user._id, isAdmin: user.isAdmin };
    }

    //* Registriert einen neuen Benutzer
    async registerUser(dto: CreateUserDto)
    {
        //* Prüfen, ob E-Mail bereits existiert
        const existingUser = await this.userService.findByEmail(dto.email);
        if (existingUser)
        {
            throw new ConflictException('Ein Benutzer mit dieser E-Mail existiert bereits');
        }

        //* Passwort hashen
        dto.password = await bcrypt.hash(dto.password, 10);

        //* Neuen Benutzer erstellen
        const user = await this.userService.create(dto);

        //* JWT-Token generieren
        const token = this.generateJwtToken(user._id.toString(), user.isAdmin);

        return { token, userId: user._id, isAdmin: user.isAdmin };
    }

    //* Erstellt einen JWT-Token für Authentifizierung
    private generateJwtToken(userId: string, isAdmin: boolean)
    {
        return jwt.sign(
            { userId, isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
    }

    //* Fehlerhafte Logins loggen (Brute-Force-Schutz)
    private async logFailedAttempt(email: string, ip?: string, userAgent?: string): Promise<void>
    {
        await this.loginAttemptModel.create({
            email,
            success: false,
            ip: ip || 'unknown',
            userAgent: userAgent || 'unknown',
        });
    }

    //* Setzt das Passwort eines Benutzers zurück (z.B. über einen Reset-Link)
    async resetPassword(email: string, newPassword: string): Promise<{ message: string }>
    {
        const user = await this.userService.findByEmail(email);
        if (!user)
        {
            ExceptionUtils.userNotFound();
        }

        //* Neues Passwort hashen und speichern
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return { message: 'Passwort erfolgreich zurückgesetzt' };
    }

    //* Logout (optional: Token-Blacklist)
    async logout(token: string): Promise<{ message: string }>
    {
        //* Falls Token-Blacklist verwendet wird, hier speichern
        return { message: 'Erfolgreich ausgeloggt' };
    }

}