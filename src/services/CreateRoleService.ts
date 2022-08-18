import { Roles } from '@prisma/client';
import { prisma } from '../database';

type IRoleData = {
    name: string,
    description: string
}
export class CreateRoleService {
    async execute({ name, description }: IRoleData): Promise<Error | Roles> {

        let role = await prisma.roles.findUnique({
            where: {
                name,
            }
        });

        if (role) {
            return new Error('Record alright exists');
        }

        role = await prisma.roles.create({
            data: {
                name,
                description,
            }
        });

        return role;
    }
}