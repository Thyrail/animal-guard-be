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

        if (!authHeader)
        {
            throw new UnauthorizedException('Kein Token vorhanden');
        }

        const token = authHeader.split(' ')[1];
        try
        {
            const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
            const user = await this.userService.findOne(decoded.userId);

            if (!user)
            {
                throw new UnauthorizedException('Benutzer nicht gefunden');
            }

            request.user = { userId: user._id.toString(), isAdmin: user.isAdmin };
            return true;
        } catch (error)
        {
            throw new UnauthorizedException('Ungültiges Token');
        }
    }

}