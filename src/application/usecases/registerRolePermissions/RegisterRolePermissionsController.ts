import { Request, Response } from 'express';
import { IRegisterRolePermissionsRequestDTO } from './RegisterRolePermissionsDTO';
import { RegisterRolePermissionsUseCase } from './RegisterRolePermissionsUseCase';



export class RegisterRolePermissionController {
    constructor(private registerRolePermissionUseCase: RegisterRolePermissionsUseCase) {
    }

    async handle(request: Request, response: Response) {
        const { roleId, permissionIds } = request.body;
        try {
            const errorOrVoid = await this.registerRolePermissionUseCase.execute({ roleId, permissionIds } as IRegisterRolePermissionsRequestDTO);
            if (errorOrVoid instanceof Error) {
                return response.status(400).json({ error: errorOrVoid.message });
                console.log(errorOrVoid);
            }
            return response.status(200).json();
        }
        catch (err) {
            return response.status(400).json({ error: 'Error unexpected' });
        }
    }
}