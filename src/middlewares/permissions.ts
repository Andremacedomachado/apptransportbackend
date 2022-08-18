import { NextFunction, Request, Response } from 'express';
import { prisma } from '../database';

export function can(permissionsRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                userPermissions: {
                    include: {
                        permissions: true
                    }
                }
            }
        });

        if (!user) {
            return response.status(400).json('User does not exists');
        }

        const permissionExists = user.userPermissions
            .map((recordPermission) => recordPermission.permissions.name)
            .some((recordPermission) => permissionsRoutes.includes(recordPermission));

        if (!permissionExists) {
            return response.status(401).end();
        }

        return next();
    };
}

export function is(rolesRoutes: string[]) {
    return async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request;

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                usersRoles: {
                    include: {
                        role: true
                    }
                }
            }
        });

        if (!user) {
            return response.status(400).json('User does not exists');
        }

        const roleExists = user.usersRoles
            .map((recordRole) => recordRole.role.name)
            .some((recordRole) => rolesRoutes.includes(recordRole));

        if (!roleExists) {
            return response.status(401).end();
        }

        return next();
    };
}
