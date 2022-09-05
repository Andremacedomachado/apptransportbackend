import { Permission } from '../../../domain/entities/permission/Permission';
import { IPermissionRepository, PermissionId } from '../../repositories/IPermissionRepository';
import { ICreatePermissionRequestDTO } from './CreatePermissionDTO';



export class CreatePermissionUseCase {

    constructor(private permissionRepository: IPermissionRepository) {
    }

    async excute(data: ICreatePermissionRequestDTO): Promise<PermissionId | Error> {

        const permissionAlrightExists = await this.permissionRepository.findByName(data.name);

        if (permissionAlrightExists) {
            return new Error('Permission alright exist');
        }

        const permission = Permission.create({
            name: data.name,
            description: data.description,
            updatedAt: new Date(),
        });

        const id = await this.permissionRepository.save(permission);
        if (!id) {
            return new Error('Error on save data in database');
        }

        return id;

    }
}