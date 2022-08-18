import { Prisma, Roles } from '@prisma/client';
import { prisma } from '../database';

export type IRolePermissionsData = {
    roleId: string,
    permissions: string[],
}
export class CreateRolePermissionsService {
    async execute({ roleId, permissions }: IRolePermissionsData): Promise<Error | Roles> {
        //verifica se o usuario existe
        let role = await prisma.roles.findUnique({
            where: {
                id: roleId
            },
            include: {
                RolePermissions: true
            }
        });
        
        if (!role) {
            return new Error('Role dont exists');
        }
        //verifica se alguma permission  não esta cadastrada comparando o quantidade de request com o resultado encontrados
        const permissionsAlright = await prisma.permissions.findMany({
            where: {
                id: {
                    in: permissions
                }
            }
        });
        
        const existspermissionsInvalidates = permissionsAlright.length !== permissions.length ? true : false;
        if (existspermissionsInvalidates) {
            return new Error('Permission not Found');
        }

        // instancia um RolePermissionsCreateManyInput e deleta os registros e cria novos registros apartir de RolePermissionsCreateManyInput
        const rolePermissionsData = permissionsAlright.map((permission) => {
            const rolePermission = {} as Prisma.RolePermissionsCreateManyInput;
            rolePermission.role_id = roleId;
            rolePermission.permissions_id = permission.id;
            return rolePermission;
        });

        await prisma.$transaction([
            prisma.rolePermissions.deleteMany({
                where: {
                    role_id: roleId
                },
            }),
            prisma.rolePermissions.createMany({
                data: rolePermissionsData
            }),
        ]);
        role = await prisma.roles.findFirst({
            where: {
                id: roleId
            },
            include: {
                RolePermissions: true
            }
        });
        if (!role) {
            return new Error('Error find role');
        }
        return role;
    }
}