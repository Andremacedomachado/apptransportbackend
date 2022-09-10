
export interface IRecordRolePermissions {
    roleId: string,
    permissionId: string,
    createdAt: Date,
    updatedAt: Date
}

export class RecordRolePermission implements IRecordRolePermissions {
    constructor(public roleId: string, public permissionId: string, public createdAt: Date, public updatedAt: Date) {
    }
}