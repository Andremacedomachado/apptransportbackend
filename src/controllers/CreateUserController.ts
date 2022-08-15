import { Request, Response } from 'express';

import { CreateUserService, IUserData } from '../services/CreateUserService';



export class CreateUserController {
    async handle(request: Request, response: Response) {

        const { name, email, password }: IUserData = request.body;

        const createUserService = new CreateUserService();
        const result = await createUserService.execute({ name, email, password });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.send(result);
    }
}
