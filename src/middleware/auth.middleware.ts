import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../models/interfaces/auth-request.interface';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware
{
    use(req: AuthenticatedRequest, res: Response, next: NextFunction)
    {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer '))
        {
            console.log("🚨 Kein Token im Header!");
            return next();
        }

        const token = authHeader.split(' ')[1];

        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string; isAdmin: boolean };
            req.user = {
                userId: decoded.userId,
                isAdmin: decoded.isAdmin
            };

            console.log("✅ Middleware Authenticated User:", req.user);
        } catch (error)
        {
            console.error("🚨 JWT Verification Error in Middleware:", error.message);
        }

        next();
    }

}