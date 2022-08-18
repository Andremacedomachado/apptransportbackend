import { Request, Response } from 'express';

import { CreatePermissionsService } from '../services';


export class CreatePermissionControler {
    async handle(request: Request, response: Response) {
        const { name, description } = request.body;

        const createPermissionService = new CreatePermissionsService();
        const result = await createPermissionService.execute({ name, description });
        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.json(result);
    }
}