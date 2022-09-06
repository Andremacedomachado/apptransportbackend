import { Role } from '../../../domain/entities/roles/Role';
import { IRoleRepository, RoleId } from '../../repositories/IRoleRepository';
import { ICreateRoleRequestDTO } from './CreateRoleDTO';

export class CreateRoleUseCase {
    constructor(private roleRepository: IRoleRepository) {
    }

    async execute(data: ICreateRoleRequestDTO): Promise<RoleId | Error> {
        const roleAlrightExist = await this.roleRepository.findByName(data.name);
        if (roleAlrightExist) {
            return new Error('Role alright exists');
        }

        const role = Role.create({
            name: data.name,
            description: data.description,
            updatedAt: new Date(),
        });

        const id = await this.roleRepository.save(role);

        if (!id) {
            return new Error('Error save role in database');
        }
        return id;

    }
}