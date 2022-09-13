import { Request, Response } from 'express';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';

export class GetAllUsersController {
    constructor(
        private getAllUsersUseCase: GetAllUsersUseCase
    ) {
    }

    async handle(request: Request, response: Response) {
        try {
            const users = await this.getAllUsersUseCase.execute();
            if (users instanceof Error) {
                return response.status(400).json({ message: users.message });
            }

            return response.status(200).json(users);
        } catch (error) {
            return response.status(400).json({ error: 'Unexpected error' });
        }
    }
}