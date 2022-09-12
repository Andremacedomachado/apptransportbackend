import { RecordUserRole } from '../../domain/entities/record-user-role/RecordUserRole';


export interface IUserRolesRepository {
    save(recordUserRole: RecordUserRole): Promise<void>,
    findById(userId: string, roleId: string): Promise<RecordUserRole | null>,
    findManyByIdUser(userId: string): Promise<RecordUserRole[] | null>,
    createManyRecords(userId: string, roleIds: string[]): Promise<void>,
    deleteManyByIdUser(userId: string): Promise<void>;
}