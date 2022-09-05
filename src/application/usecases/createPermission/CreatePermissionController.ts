import { Request, Response } from 'express';
import { CreatePermissionUseCase } from './CreatePermissionUseCase';
import { ICreatePermissionRequestDTO } from './CreatePermissionDTO';

export class CreatePermissionController {

    constructor(
        private createPermissionUseCase: CreatePermissionUseCase
    ) { }

    async handle(request: Request, response: Response) {
        const { name, description } = request.body;
        try {
            const idOrError = await this.createPermissionUseCase.excute({ name, description } as ICreatePermissionRequestDTO);
            if (idOrError instanceof Error) {
                return response.status(400).json({ error: idOrError.message });
            }
            return response.status(200).json({ id: idOrError.id });
        } catch (err) {
            return response.status(400).json({ message: 'Unexpected error' });
        }
    }
}