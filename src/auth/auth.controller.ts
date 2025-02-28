import { Controller, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthenticatedRequest } from '../models/interfaces/auth-request.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController
{
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @ApiResponse({ status: 200, description: 'Login erfolgreich' })
    @ApiResponse({ status: 401, description: 'Falsche Zugangsdaten' })
    async login(@Body() loginDto: LoginDto, @Req() req: AuthenticatedRequest)
    {
        const ip = req.ip;
        const userAgent = req.headers['user-agent'];

        const authData = await this.authService.validateUser(loginDto.email, loginDto.password, ip, userAgent);

        if (!authData)
        {
            throw new UnauthorizedException('Ungültige Zugangsdaten');
        }

        return authData;
    }

}