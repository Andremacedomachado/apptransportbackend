import { IRegisterUserPermissionRequestDTO } from './RegisterUserPermissionDTO';
import { IPermissionRepository } from '../../repositories/IPermissionRepository';
import { IUserPermissionRepository } from '../../repositories/IUserPermissionRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { RecordUserPermission } from '../../../domain/entities/record-user-permission/RecordUserPermission';

export class RegisterUserPermissionUseCase {
    constructor(
        private userRepository: IUserRepository,
        private permissionRepository: IPermissionRepository,
        private userPermissionRepository: IUserPermissionRepository
    ) {
    }

    async execute(data: IRegisterUserPermissionRequestDTO): Promise<Error | void> {
        const userExist = await this.userRepository.findById(data.userId);
        if (!userExist) {
            return new Error('User not exist');
        }
        const userProviderExist = await this.userRepository.findById(data.providerId);
        if (!userProviderExist) {
            return new Error('User not exist');
        }
        const permissionExist = await this.permissionRepository.findById(data.permissionId);
        if (!permissionExist) {
            return new Error('Permission not exist');
        }

        const recordExist = await this.userPermissionRepository.findById(userExist.id, permissionExist.id, userProviderExist.id);
        if (recordExist) {
            return new Error('Permission alright exist in user');
        }

        const record = new RecordUserPermission({
            userId: userExist.id,
            permissionId: permissionExist.id,
            createdAt: new Date(),
            providerId: userProviderExist.id,
        });
        await this.userPermissionRepository.save(record);
    }
}