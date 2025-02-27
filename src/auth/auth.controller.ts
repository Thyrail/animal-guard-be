import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController
{
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() loginDto: LoginDto, @Req() req)
    {
        const ip = req.ip;
        const userAgent = req.headers['user-agent'];
        return this.authService.validateUser(loginDto.email, loginDto.password, ip, userAgent);
    }

}