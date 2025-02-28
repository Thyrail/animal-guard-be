import { UnauthorizedException, ConflictException, BadRequestException } from '@nestjs/common';

export class ExceptionUtils
{
    static userNotFound()
    {
        throw new UnauthorizedException('Benutzer nicht gefunden oder falsches Passwort');
    }

    static duplicateUser()
    {
        throw new ConflictException('Ein Benutzer mit dieser E-Mail existiert bereits');
    }

    static invalidToken()
    {
        throw new UnauthorizedException('Ungültiger Token oder nicht authentifiziert');
    }

    static missingFields()
    {
        throw new BadRequestException('Fehlende Felder im Request');
    }

}