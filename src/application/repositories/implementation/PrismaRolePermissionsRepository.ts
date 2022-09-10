import { prisma } from '../../../database';
import { RecordRolePermission } from '../../../domain/entities/record-role-permission/RecordRolePermissions';
import { IOperationValidate, IRolePermissionsRepository } from '../IRolePermissionsRepository';

export class PrismaRolePermissionsRepository implements IRolePermissionsRepository {
    async save(recordRolePermission: RecordRolePermission): Promise<void> {
        const { roleId, permissionId, createdAt, updatedAt } = recordRolePermission;
        await prisma.rolePermissions.create({
            data: {
                role_id: roleId,
                permissions_id: permissionId,
                createdAt,
                updatedAt,
            }
        });

    }

    async createManyRecords(roleId: string, permissionIds: string[]): Promise<void> {
        permissionIds.forEach(async (permissionId) => {
            const recordRolePermission = new RecordRolePermission(
                roleId,
                permissionId,
                new Date(),
                new Date(),
            );
            await this.save(recordRolePermission);
        });
    }
    async findById(roleId: string, permissionId: string): Promise<RecordRolePermission | null> {
        const rolePermission = await prisma.rolePermissions.findUnique({
            where: {
                role_id_permissions_id: {
                    role_id: roleId,
                    permissions_id: permissionId
                }
            }
        });
        if (!rolePermission) {
            return null;
        }

        const recordRolePermission = new RecordRolePermission(
            rolePermission.role_id,
            rolePermission.permissions_id,
            rolePermission.createdAt,
            rolePermission.updatedAt
        );

        return recordRolePermission;
    }
    async findManyByIdRole(roleId: string): Promise<RecordRolePermission[] | null> {
        const rolePermissions = await prisma.rolePermissions.findMany({
            where: {
                role_id: roleId
            }
        });
        if (rolePermissions.length < 1) {
            return null;
        }
        const recordRolePermissions: RecordRolePermission[] = [] as RecordRolePermission[];
        rolePermissions.forEach((rolePermission) => {
            const recordRolePermission = new RecordRolePermission(
                rolePermission.role_id,
                rolePermission.permissions_id,
                rolePermission.createdAt,
                rolePermission.updatedAt
            );
            recordRolePermissions.push(recordRolePermission);
        });
        return recordRolePermissions;
    }
    async deleteManyByIdRole(roleId: string): Promise<void> {
        await prisma.rolePermissions.deleteMany({
            where: {
                role_id: roleId
            },
        });

    }
}