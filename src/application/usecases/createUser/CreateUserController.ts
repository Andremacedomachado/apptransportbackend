import { Request, Response } from 'express';
import { CreateUserUseCase } from './CreateUserUseCase';


export class CreateUserController {

    constructor(
        private createUserUseCase: CreateUserUseCase
    ) { }

    async handle(request: Request, response: Response) {
        const { name, email, password } = request.body;
        try {
            const idOrError = await this.createUserUseCase.execute({ name, email, password });
            if (idOrError instanceof Error) {
                return response.status(400).json({ error: idOrError.message });
            }
            return response.status(200).json({ id: idOrError.id });
        } catch (err) {
            return response.status(400).json({ message: 'Unexpected error' });
        }
    }
}