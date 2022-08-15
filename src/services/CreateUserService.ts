
import { hash } from 'bcryptjs';

import { prisma } from '../database';

type IUserData = {
    name: string,
    password: string,
    email: string
}
export class CreateUserService {
    async execute({ name, password, email }: IUserData) {

        const existUsers = await prisma.user.findFirst({
            where: {
                email,
            }
        });

        if (existUsers) {
            return new Error('User alright exists');
        }

        const hashPassword = await hash(password, 8);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashPassword
            }
        });

        return { user };
    }
}