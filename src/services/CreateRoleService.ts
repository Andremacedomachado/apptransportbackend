import { Role } from '@prisma/client';
import { prisma } from '../database';

type IRoleData = {
    name: string,
    description: string
}
export class CreateRoleService {
    async execute({ name, description }: IRoleData): Promise<Error | Role> {

        const existRecord = await prisma.role.findFirst({
            where: {
                name,
            }
        });

        if (existRecord) {
            return new Error('Record alright exists');
        }

        const record = await prisma.role.create({
            data: {
                name,
                description,
            }
        });

        return record;
    }
}