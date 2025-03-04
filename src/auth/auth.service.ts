import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
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

    async validateUser(email: string, password: string, ip?: string, userAgent?: string)
    {
        const user = await this.userService.findByEmail(email);
        if (!user)
        {
            await this.logFailedAttempt(email, ip, userAgent);
            throw ExceptionUtils.userNotFound();
        }

        //* Brute-Force-Schutz: Prüfen, ob zu viele Fehlversuche
        const failedAttempts = await this.loginAttemptModel.countDocuments({
            email,
            success: false,
            createdAt: { $gte: new Date(Date.now() - 15 * 60 * 1000) } // Letzte 15 Min.
        });

        if (failedAttempts >= 5)
        {
            throw new UnauthorizedException('Zu viele fehlgeschlagene Versuche. Versuche es später erneut.');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
        {
            await this.logFailedAttempt(email, ip, userAgent);
            throw ExceptionUtils.userNotFound();
        }

        await this.loginAttemptModel.create({ email, success: true, ip: ip || 'unknown', userAgent: userAgent || 'unknown' });

        return { token: this.generateJwtToken(user._id.toString(), user.isAdmin), userId: user._id, isAdmin: user.isAdmin };
    }

    async registerUser(dto: CreateUserDto)
    {
        if (await this.userService.findByEmail(dto.email))
        {
            throw new ConflictException('Ein Benutzer mit dieser E-Mail existiert bereits');
        }

        dto.password = await bcrypt.hash(dto.password, 10);
        const user = await this.userService.create(dto);
        return { token: this.generateJwtToken(user._id.toString(), user.isAdmin), userId: user._id, isAdmin: user.isAdmin };
    }

    private generateJwtToken(userId: string, isAdmin: boolean)
    {
        if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET ist nicht definiert');

        return jwt.sign(
            { userId, isAdmin },
            process.env.JWT_SECRET as string,
            { expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600') }
        );
    }

    private async logFailedAttempt(email: string, ip?: string, userAgent?: string): Promise<void>
    {
        await this.loginAttemptModel.create({ email, success: false, ip: ip || 'unknown', userAgent: userAgent || 'unknown' });
    }

    async resetPassword(email: string, newPassword: string): Promise<{ message: string }>
    {
        const user = await this.userService.findByEmail(email);
        if (!user) return { message: 'Passwort erfolgreich zurückgesetzt' };

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return { message: 'Passwort erfolgreich zurückgesetzt' };
    }

}