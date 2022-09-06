import { Request, Response } from 'express';

import { ICreateRoleRequestDTO } from './CreateRoleDTO';
import { CreateRoleUseCase } from './CreateRoleUseCase';

export class CreateRoleController {

    constructor(private createRoleUseCase: CreateRoleUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { name, description } = request.body;
        try {
            const idOrError = await this.createRoleUseCase.execute({ name, description } as ICreateRoleRequestDTO);
            if (idOrError instanceof Error) {
                return response.status(400).json({ error: idOrError.message });
            }
            return response.status(200).json(idOrError);
        } catch (err) {
            return response.status(400).json({ error: 'Unexpected error' });
        }
    }
}