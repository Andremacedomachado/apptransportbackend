import { Request, Response } from 'express';
import { CreateRoleService } from '../services';

import { CreateUserService } from '../services/CreateUserService';



export class CreateRoleController {
    async handle(request: Request, response: Response) {

        const { name, description } = request.body;

        const createRoleService = new CreateRoleService();
        const result = await createRoleService.execute({ name, description });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }
        
        return response.send(result);
    }
}
