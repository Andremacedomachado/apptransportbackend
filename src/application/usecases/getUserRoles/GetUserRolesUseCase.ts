import { IRoleRepository } from '../../repositories/IRoleRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserRolesRepository } from '../../repositories/IUserRolesRepository';
import { IGetUserRolesRequestDTO, IGetUserRolesResponseDTO, IRoleDataResponseDTO } from './GetUserRolesDTO';



export class GetUserRolesUseCase {
    constructor(
        private userRepository: IUserRepository,
        private userRolesRepository: IUserRolesRepository,
        private roleRepository: IRoleRepository,
    ) {

    }

    async execute(data: IGetUserRolesRequestDTO) {

        const user = await this.userRepository.findById(data.userId);
        if (!user) {
            return new Error('User not exist');
        }

        const recordRoles = await this.userRolesRepository.findManyByIdUser(data.userId);
        if (!recordRoles) {
            return new Error('No roles in user');
        }
        const roleIds = recordRoles.map((recordRole) => {
            return recordRole.roleId;
        });
        const dataRoles = await this.roleRepository.findManyByIds(roleIds);
        if (!dataRoles) {
            return new Error('Role is nothing and exist record inconsistent');
        }
        const rolesResponse = dataRoles.map((role, index) => {
            const dataResponse: IRoleDataResponseDTO = {
                name: role.props.name,
                roleId: role.id,
                createdAt: recordRoles[index].createdAt,
                updatedAt: recordRoles[index].updatedAt,
            };
            return dataResponse;
        });

        const response: IGetUserRolesResponseDTO = {
            roles: rolesResponse,
            count: rolesResponse.length
        };

        return response;
    }
}