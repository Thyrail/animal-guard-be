import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../models/interfaces/auth-request.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware
{
    use(req: AuthenticatedRequest, res: Response, next: NextFunction)
    {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token)
        {
            throw new UnauthorizedException('Kein Token vorhanden');
        }

        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; isAdmin: boolean };
            req.user = decoded;
            next();
        } catch (error)
        {
            throw new UnauthorizedException('Ungültiges Token');
        }
    }

}