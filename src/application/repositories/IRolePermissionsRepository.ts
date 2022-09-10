import { RecordRolePermission } from '../../domain/entities/record-role-permission/RecordRolePermissions';
export interface IOperationValidate {
    completed: boolean
}

export interface IRolePermissionsRepository {
    save(recordRolePermission: RecordRolePermission): Promise<void>,
    findById(roleId: string, permissionId: string): Promise<RecordRolePermission | null>,
    findManyByIdRole(roleId: string): Promise<RecordRolePermission[] | null>,
    createManyRecords(roleId: string, permissionIds: string[]): Promise<void>,
    deleteManyByIdRole(roleId: string): Promise<void>;
}