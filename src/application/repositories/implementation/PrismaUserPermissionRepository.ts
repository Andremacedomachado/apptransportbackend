import { prisma } from '../../../database';
import { RecordUserPermission } from '../../../domain/entities/record-user-permission/RecordUserPermission';
import { IUserPermissionRepository } from '../IUserPermissionRepository';




export class PrismaUserPermissionRepository implements IUserPermissionRepository {
    async save(record: RecordUserPermission): Promise<void> {
        const { userId, permissionId, createdAt, providerId } = record;
        await prisma.userPermissions.create({
            data: {
                user_id: userId,
                permissions_id: permissionId,
                provider_id: providerId,
                createdAt,
            }
        });
    }
    async findById(userId: string, permissionId: string, providerId: string): Promise<RecordUserPermission | null> {
        const userPermission = await prisma.userPermissions.findUnique({
            where: {
                user_id_permissions_id: {
                    user_id: userId,
                    permissions_id: permissionId
                }
            }
        });
        if (!userPermission) {
            return null;
        }
        const recordUserPermission = new RecordUserPermission({
            userId: userPermission.user_id,
            permissionId: userPermission.permissions_id,
            createdAt: userPermission.createdAt,
            providerId
        });
        return recordUserPermission;
    }

}