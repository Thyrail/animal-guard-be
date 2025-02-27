import { NextFunction, Request, Response } from 'express';

export function swaggerAuthMiddleware(req: Request, res: Response, next: NextFunction)
{
    const auth = req.headers.authorization;

    if (!auth)
    {
        res.set('WWW-Authenticate', 'Basic realm="Swagger"');
        return res.status(401).send('Authentifizierung erforderlich');
    }

    const [username, password] = Buffer.from(auth.split(' ')[1], 'base64').toString().split(':');

    if (
        username !== process.env.SWAGGER_USERNAME ||
        password !== process.env.SWAGGER_PASSWORD
    )
    {
        return res.status(403).send('Ungültige Zugangsdaten');
    }

    next();
}