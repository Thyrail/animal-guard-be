import { ApiProperty } from '@nestjs/swagger';

export class LoginDto
{
    @ApiProperty({ example: 'user@example.com', description: 'E-Mail des Benutzers' })
    email: string;

    @ApiProperty({ example: 'SecurePassword123!', description: 'Passwort des Benutzers' })
    password: string;
}