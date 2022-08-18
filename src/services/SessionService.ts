import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { prisma } from '../database';

interface ISessionRequest {
    email: string,
    password: string,
}

export class SessionService {

    async execute({ email, password }: ISessionRequest) {

        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (!user) {
            return new Error('User or password incorrect');
        }
        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            return new Error('User or password incorrect');
        }
        const SECRET_JWT = '2e054c9e1c90f0052aeb8ab7403cdd51';
        const token = sign({}, SECRET_JWT, {
            expiresIn: '1H',
            subject: user.id
        });

        return {token};
    }
}