import { Request, Response } from 'express';

import { RegisterUserPermissionUseCase } from './RegisterUserPermissionUseCase';



export class RegisterUserPermissionController {
    constructor(private registerUserPermissionUseCase: RegisterUserPermissionUseCase) {
    }
    async handle(request: Request, response: Response) {
        const { userId, permissionId, providerId } = request.body;

        try {
            const nullOrError = await this.registerUserPermissionUseCase.execute({ userId, permissionId, providerId });
            if (nullOrError instanceof Error) {
                return response.status(400).json({ error: nullOrError.message });
            }
            return response.status(200).send();
        } catch (error) {
            return response.status(400).json({ error: 'Unexpected error' });
        }
    }
}