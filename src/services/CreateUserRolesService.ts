import { Prisma, User } from '@prisma/client';
import { prisma } from '../database';

type IUserRolesRequest = {
    userId: string,
    roles: string[]
}
export class CreateUserRolesService {
    async execute({ userId, roles }: IUserRolesRequest): Promise<Error | User> {
        //verifica se o usuario existe
        let user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user) {
            return new Error('User not exists');
        }

        //verifica se alguma role  não esta cadastrada comparando o quantidade de request com o resultado encontrados
        const existsRoles = await prisma.roles.findMany({
            where: {
                id: {
                    in: roles
                }
            }
        });

        const existspermissionsInvalidates = existsRoles.length !== roles.length ? true : false;
        if (existspermissionsInvalidates) {
            return new Error('Permission not Found');
        }

        // instancia um RolePermissionsCreateManyInput e deleta os registros e cria novos registros apartir de RolePermissionsCreateManyInput
        const userRolesData = existsRoles.map((permission) => {
            const userRole = {} as Prisma.UsersRolesCreateManyInput;
            userRole.user_id = userId;
            userRole.role_id = permission.id;
            return userRole;
        });

        await prisma.$transaction([
            prisma.usersRoles.deleteMany({
                where: {
                    user_id: userId
                },
            }),
            prisma.usersRoles.createMany({
                data: userRolesData
            }),
        ]);

        user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                usersRoles: true
            }
        });

        if (!user) {
            return new Error('Error find user');
        }

        return user;
    }
}