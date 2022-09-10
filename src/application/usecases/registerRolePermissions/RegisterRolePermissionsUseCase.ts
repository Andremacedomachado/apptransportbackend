import { IRoleRepository } from '../../repositories/IRoleRepository';
import { IPermissionRepository } from '../../repositories/IPermissionRepository';
import { IRolePermissionsRepository } from '../../repositories/IRolePermissionsRepository';
import { IRegisterRolePermissionsRequestDTO } from './RegisterRolePermissionsDTO';


export class RegisterRolePermissionsUseCase {

    constructor(
        private roleRepository: IRoleRepository,
        private permissionRepository: IPermissionRepository,
        private rolePermissionsRepository: IRolePermissionsRepository,
    ) {
    }

    async execute(data: IRegisterRolePermissionsRequestDTO): Promise<void | Error> {
        //verificar se role existe
        const roleExist = await this.roleRepository.findById(data.roleId);
        if (!roleExist) {
            return new Error('Role not exist');
        }
        // verificar se as permissions exitem
        const permissionsExists = await this.permissionRepository.verifyIfAllExists(data.permissionIds);
        if (!permissionsExists) {
            return new Error('Permission not exist');
        }
        // retirar vinculos de registros anexado a role
        await this.rolePermissionsRepository.deleteManyByIdRole(data.roleId);
        // anexar vinculos novos
        await this.rolePermissionsRepository.createManyRecords(data.roleId, data.permissionIds);

    }
}