import { Request, Response } from 'express';

import { CreateRolePermissionsService } from '../services/CreateRolePermissionsService';

export class CreateRolePermissionsController {
    async handle(request: Request, response: Response) {
        const {roleId} = request.params;
        const {permissions } = request.body;

        const createRolePermissionsService = new CreateRolePermissionsService();
        const result = await createRolePermissionsService.execute({ roleId, permissions });

        if (result instanceof Error) {
            return response.status(400).json(result.message);
        }

        return response.send(result);
    }
}
