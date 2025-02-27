import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware
{
    use(req: Request, res: Response, next: NextFunction)
    {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token)
        {
            throw new UnauthorizedException('Kein Token vorhanden');
        }

        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error)
        {
            throw new UnauthorizedException('Ungültiges Token');
        }
    }
}