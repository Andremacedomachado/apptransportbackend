import { prisma } from '../../../database';
import { Permission } from '../../../domain/entities/permission/Permission';
import { IPermissionRepository, PermissionId } from '../IPermissionRepository';

export class PrismaPermissionRepository implements IPermissionRepository {

    async save(permission: Permission): Promise<PermissionId | null> {
        const { name, description, createdAt, updatedAt } = permission.props;
        const permissionCreated = await prisma.permissions.create({
            data: {
                name,
                description: description,
                createdAt,
                updatedAt,
            }
        });

        return { id: permissionCreated.id };
    }
    async findById(id: string): Promise<Permission | null> {
        const permission = await prisma.permissions.findFirst({
            where: {
                id
            }
        });
        if (!permission) {
            return null;
        }

        const permissionInMemory = Permission.create({
            name: permission.name,
            description: permission.description,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
        }, permission.id);

        return permissionInMemory;

    }

    async findByName(name: string): Promise<Permission | null> {
        const permission = await prisma.permissions.findFirst({
            where: {
                name
            }
        });
        if (!permission) {
            return null;
        }

        const permissionInMemory = Permission.create({
            name: permission.name,
            description: permission.description,
            createdAt: permission.createdAt,
            updatedAt: permission.updatedAt,
        }, permission.id);

        return permissionInMemory;
    }

    async verifyIfAllExists(permissionIds: string[]): Promise<boolean> {
        let allExists = false;
        const getMultPermissionFindByIds = async (permissionIds: string[]) => {
            const permissions = permissionIds.map(async permissionId => {
                const data = await this.findById(permissionId);
                return data;
            });
            return Promise.all(permissions);
        };
        const permissionExist = await getMultPermissionFindByIds(permissionIds);
        allExists = !permissionExist.some(item => item == null);
        return allExists;
    }
}