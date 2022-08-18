import { Permissions } from '@prisma/client';
import { prisma } from '../database';

 type IPermissionsData = {
    name: string,
    description: string
}
export class CreatePermissionsService {
    async execute({ name, description }: IPermissionsData): Promise<Error | Permissions> {

        const existRecord = await prisma.permissions.findUnique({
            where: {
                name,
            }
        });

        if (existRecord) {
            return new Error('Record alright exists');
        }

        const record = await prisma.permissions.create({
            data: {
                name,
                description,
            }
        });

        return record;
    }
}