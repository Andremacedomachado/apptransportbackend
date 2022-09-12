import { prisma } from '../../../database';
import { RecordUserRole } from '../../../domain/entities/record-user-role/RecordUserRole';
import { IUserRolesRepository } from '../IUserRolesRepository';


export class PrismaUserRolesRepository implements IUserRolesRepository {
    async save(recordUserRole: RecordUserRole): Promise<void> {
        const { userId, roleId, createdAt, updatedAt } = recordUserRole;
        await prisma.usersRoles.create({
            data: {
                user_id: userId,
                role_id: roleId,
                createdat: createdAt,
                updatedAt,
            }
        });
    }

    async createManyRecords(userId: string, roleIds: string[]): Promise<void> {
        roleIds.forEach(async (roleId) => {
            const record = new RecordUserRole(
                userId,
                roleId,
                new Date(),
                new Date(),
            );
            await this.save(record);
        });
    }
    async findById(userId: string, roleId: string): Promise<RecordUserRole | null> {
        const userRole = await prisma.usersRoles.findUnique({
            where: {
                user_id_role_id: {
                    user_id: userId,
                    role_id: roleId
                }
            }
        });
        if (!userRole) {
            return null;
        }

        const recordUserRole = new RecordUserRole(
            userRole.user_id,
            userRole.role_id,
            userRole.createdat,
            userRole.updatedAt
        );

        return recordUserRole;
    }
    async findManyByIdUser(userId: string): Promise<RecordUserRole[] | null> {
        const userRoles = await prisma.usersRoles.findMany({
            where: {
                user_id: userId
            }
        });
        if (userRoles.length < 1) {
            return null;
        }
        const recordUserRoles: RecordUserRole[] = [] as RecordUserRole[];
        userRoles.forEach((rolePermission) => {
            const recordUserRole = new RecordUserRole(
                rolePermission.user_id,
                rolePermission.role_id,
                rolePermission.createdat,
                rolePermission.updatedAt
            );
            recordUserRoles.push(recordUserRole);
        });
        return recordUserRoles;
    }
    async deleteManyByIdUser(userId: string): Promise<void> {
        await prisma.usersRoles.deleteMany({
            where: {
                user_id: userId
            },
        });

    }
}