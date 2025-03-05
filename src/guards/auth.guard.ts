import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthenticatedRequest } from '../models/interfaces/auth-request.interface';
import * as jwt from 'jsonwebtoken';
import { UserService } from '../api/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private readonly userService: UserService) { }

    async canActivate(context: ExecutionContext): Promise<boolean>
    {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const authHeader = request.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer '))
        {
            console.log("🚨 Kein gültiges Token im Header gefunden!");
            throw new UnauthorizedException('Kein gültiges Token im Header gefunden');
        }

        const token = authHeader.split(' ')[1];
        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string, isAdmin: boolean };
            const user = await this.userService.findOne(decoded.userId);

            if (!user)
            {
                console.log("🚨 Benutzer existiert nicht oder wurde gelöscht!");
                throw new UnauthorizedException('Benutzer existiert nicht oder wurde gelöscht');
            }

            // **JWT Benutzer in den Request setzen**
            request.user = {
                userId: user._id.toString(),
                isAdmin: user.isAdmin
            };

            console.log("✅ Authenticated User:", request.user);
            return true;
        } catch (error)
        {
            console.error('🚨 JWT Verification Error:', error.message);
            throw new UnauthorizedException('Ungültiges Token oder abgelaufen');
        }
    }
    
}