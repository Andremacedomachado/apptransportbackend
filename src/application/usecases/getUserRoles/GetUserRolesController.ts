import { Request, Response } from 'express';
import { IGetUserRolesRequestDTO } from './GetUserRolesDTO';
import { GetUserRolesUseCase } from './GetUserRolesUseCase';

export class GetUserRolesController {
    constructor(
        private getUserRolesUseCase: GetUserRolesUseCase,
    ) {
    }

    async handle(request: Request, response: Response) {
        const { userId } = request.params;
        try {
            const dataOrError = await this.getUserRolesUseCase.execute({ userId } as IGetUserRolesRequestDTO);
            if (dataOrError instanceof Error) {
                return response.status(400).json({ error: dataOrError.message });
            }
            return response.status(200).json(dataOrError);
        } catch (error) {
            return response.status(400).json({ error: 'Unexpected Error' });
        }
    }
}