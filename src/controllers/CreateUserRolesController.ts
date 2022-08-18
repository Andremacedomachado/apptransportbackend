import { Request, Response } from 'express';

import {CreateUserRolesService } from '../services';


export class CreateUserRolesControler {
    async handle(request: Request, response: Response) {
        const { userId, roles } = request.body;

        const createUserRolesService = new CreateUserRolesService();
        const result = await createUserRolesService.execute({ userId, roles });
        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}