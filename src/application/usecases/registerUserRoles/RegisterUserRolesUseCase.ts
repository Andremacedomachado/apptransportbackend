import { IRoleRepository } from '../../repositories/IRoleRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { IUserRolesRepository } from '../../repositories/IUserRolesRepository';
import { IRegisterUserRolesDTO } from './RegisterUserRolesDTO';


export class RegisterUserRolesUseCase {
    constructor(
        private userRepository: IUserRepository,
        private roleRepository: IRoleRepository,
        private userRolesRepository: IUserRolesRepository) {
    }

    async execute(data: IRegisterUserRolesDTO): Promise<Error | void> {
        const userExist = await this.userRepository.findById(data.userId);
        if (!userExist) {
            return new Error('User not exist');
        }
        const roleExists = await this.roleRepository.verifyIfAllExists(data.roleIds);
        if (!roleExists) {
            return new Error('Role not exist');
        }
        await this.userRolesRepository.deleteManyByIdUser(data.userId);
        await this.userRolesRepository.createManyRecords(data.userId, data.roleIds);

    }
}