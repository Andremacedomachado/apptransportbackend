import { NextFunction, Request, Response } from 'express';

import { decode, verify } from 'jsonwebtoken';

export const IsAuthenticated = () => {
    return async (request: Request, response: Response, next: NextFunction) => {
        const authHeaders = request.headers.authorization;

        if (!authHeaders) {
            return response.status(401).json({ error: 'Token is missing' });
        }
        const SECRET_JWT = '2e054c9e1c90f0052aeb8ab7403cdd51';
        const [_, token] = authHeaders.split(' ');
        try {
            verify(token, SECRET_JWT);
            const sub = decode(token);
            if (!sub?.sub) {
                return new Error('Error token');
            }
            request.userId = sub?.sub.toString();
            return next();
        } catch (error) {
            return response.status(401).end();
        }
    };
};