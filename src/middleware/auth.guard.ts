import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate
{
    canActivate(context: ExecutionContext): boolean
    {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader)
        {
            throw new UnauthorizedException('Kein Token vorhanden');
        }

        const token = authHeader.split(' ')[1];
        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { isAdmin: boolean };
            request.user = decoded;
            return true;
        } catch (error)
        {
            throw new UnauthorizedException('Ungültiges Token');
        }
    }

}