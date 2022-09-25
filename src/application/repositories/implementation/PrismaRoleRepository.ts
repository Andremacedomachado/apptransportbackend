import { prisma } from '../../../database';
import { Role } from '../../../domain/entities/roles/Role';
import { IRoleRepository, RoleId } from '../IRoleRepository';




export class PrismaRoleRepository implements IRoleRepository {
    async save(role: Role): Promise<RoleId | null> {
        const { name, description, createdAt, updatedAt } = role.props;
        const roleCreated = await prisma.roles.create({
            data: {
                name,
                description,
                createdAt,
                updatedAt
            }
        });

        return { id: roleCreated.id };
    }
    async findById(id: string): Promise<Role | null> {
        const role = await prisma.roles.findUnique({
            where: {
                id
            }
        });
        if (!role) {
            return null;
        }
        const { name, description, createdAt, updatedAt } = role;
        const roleInMemory = Role.create({
            name,
            description,
            createdAt,
            updatedAt
        }, role.id);

        return roleInMemory;
    }

    async findManyByIds(ids: string[]): Promise<Role[] | null> {
        const roles = await prisma.roles.findMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        if (roles.length < 1) {
            return null;
        }
        const rolesInMemory = roles.map((role) => {
            const roleInMemory = Role.create({
                name: role.name,
                description: role.description,
                createdAt: role.createdAt,
                updatedAt: role.updatedAt
            }, role.id);

            return roleInMemory;
        });

        return rolesInMemory;
    }

    async findByName(name: string): Promise<Role | null> {
        const role = await prisma.roles.findUnique({
            where: {
                name
            }
        });
        if (!role) {
            return null;
        }
        const { id, description, createdAt, updatedAt } = role;
        const roleInMemory = Role.create({
            name: role.name,
            description,
            createdAt,
            updatedAt
        }, id);

        return roleInMemory;
    }

    async verifyIfAllExists(roleIds: string[]): Promise<boolean> {
        let allExists = false;
        const getMultPermissionFindByIds = async (roleIds: string[]) => {
            const roles = roleIds.map(async roleId => {
                const data = await this.findById(roleId);
                return data;
            });
            return Promise.all(roles);
        };
        const permissionExist = await getMultPermissionFindByIds(roleIds);
        allExists = !permissionExist.some(item => item == null);
        return allExists;
    }

}