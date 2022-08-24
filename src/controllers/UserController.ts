import { IUserIdData, UserService } from '../services/UserService';
import { Request, Response } from 'express';
import { decode } from 'jsonwebtoken';

export class UserController {
    async handle(request: Request, response: Response) {
        const authHeader = request.headers.authorization || '';

        if (!authHeader) {
            return response.status(401).json({ message: 'Missing token' });
        }

        const [_, token] = authHeader.split(' ');
        const payload = decode(token);

        const id = payload?.sub;
        if (!id) {
            return response.status(401).json({ message: 'Not authorized!' });
        }


        const userService = new UserService();
        const result = await userService.roles({ id } as IUserIdData);

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.send(result);
    }
}