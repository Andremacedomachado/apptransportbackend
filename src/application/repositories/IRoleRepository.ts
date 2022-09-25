import { Role } from '../../domain/entities/roles/Role';

export interface RoleId {
    id: string
}

export interface IRoleRepository {
    save(role: Role): Promise<RoleId | null>,
    findById(id: string): Promise<Role | null>,
    findManyByIds(ids: string[]): Promise<Role[] | null>,
    findByName(name: string): Promise<Role | null>,
    verifyIfAllExists(roleIds: string[]): Promise<boolean>,
}