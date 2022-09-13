import { hash } from 'bcryptjs';
import { IUserRepository, UserId } from '../IUserRepository';
import { User } from '../../../domain/entities/users/User';
import { prisma } from '../../../database';


export class PrismaUserRepository implements IUserRepository {

    async save(user: User): Promise<UserId | null> {
        const { name, email, password } = user.props;
        const hashPassword = await hash(password, 8);

        const userCreated = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword
            }
        });

        return { id: userCreated.id };
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            return null;
        }
        const userInMemory = User.create({
            name: user.name,
            email: user.email,
            createdAt: user.createdat,
            updatedAt: user.updatedAt,
            password: user.password
        }, user.id);
        return userInMemory;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return null;
        }

        const userInMemory = User.create({
            name: user.name,
            email: user.email,
            createdAt: user.createdat,
            updatedAt: user.updatedAt,
            password: user.password
        }, user.id);
        return userInMemory;
    }

    async findAll(): Promise<User[] | null> {
        const users = await prisma.user.findMany({});
        if (users.length < 1) {
            return null;
        }
        const userCollection = [] as User[];
        users.forEach((user) => {
            const userInMemory = User.create({
                name: user.name,
                email: user.email,
                createdAt: user.createdat,
                updatedAt: user.updatedAt,
                password: user.password
            }, user.id);
            userCollection.push(userInMemory);
        });
        return userCollection;
    }
}