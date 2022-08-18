import { Request, Response } from 'express';
import { SessionService } from '../services/SessionService';

export class SessionController {
    async handle(request: Request, response: Response) {

        const { email, password } = request.body;

        const sessionSevice = new SessionService();
        const result = await sessionSevice.execute({ email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.send(result);
    }
}
