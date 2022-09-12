import { Request, Response } from 'express';
import { IRegisterUserRolesDTO } from './RegisterUserRolesDTO';
import { RegisterUserRolesUseCase } from './RegisterUserRolesUseCase';



export class RegisterUserRolesController {
    constructor(private registerUserRolesUseCase: RegisterUserRolesUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { userId, roleIds } = request.body;
        try {
            const errorOrVoid = await this.registerUserRolesUseCase.execute({ userId, roleIds } as IRegisterUserRolesDTO);

            if (errorOrVoid instanceof Error) {
                return response.status(400).json({ error: errorOrVoid.message });
            }
            return response.status(200).json();
        } catch (err) {
            return response.status(400).json({ error: 'Unexpected Error' });
        }
    }
}