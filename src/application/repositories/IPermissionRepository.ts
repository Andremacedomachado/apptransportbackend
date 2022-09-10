import { Permission } from '../../domain/entities/permission/Permission';

export type PermissionId = {
    id: string
}

export interface IPermissionRepository {
    save(permission: Permission): Promise<PermissionId | null>,
    findById(id: string): Promise<Permission | null>,
    findByName(name: string): Promise<Permission | null>,
    verifyIfAllExists(permissionIds: string[]): Promise<boolean>,
}