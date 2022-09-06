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
                createdat: createdAt,
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
        const { name, description, createdat, updatedAt } = role;
        const roleInMemory = Role.create({
            name,
            description,
            createdAt: createdat,
            updatedAt
        }, role.id);

        return roleInMemory;
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
        const { id, description, createdat, updatedAt } = role;
        const roleInMemory = Role.create({
            name: role.name,
            description,
            createdAt: createdat,
            updatedAt
        }, id);

        return roleInMemory;
    }

}