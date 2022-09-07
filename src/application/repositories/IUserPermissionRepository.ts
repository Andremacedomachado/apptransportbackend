import { RecordUserPermission } from '../../domain/entities/record-user-permission/RecordUserPermission';


export interface IUserPermissionRepository {
    save(record: RecordUserPermission): Promise<void>,
    findById(userId: string, permissionId: string, providerId: string): Promise<RecordUserPermission | null>
}