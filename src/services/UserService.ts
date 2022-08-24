
import { prisma } from '../database';

export type IUserIdData = {
    id: string
}
export class UserService {
    async roles({ id }: IUserIdData) {
        const user = await prisma.user.findFirst({
            where: {
                id,
            },
            include: {
                usersRoles: {
                    select: {
                        role: true
                    }
                }
            }
        });

        if (!user) {
            return new Error('User not exists');
        }

        const roles = user.usersRoles.map((objRoles) => {
            return objRoles.role.name;
        });


        return { roles };
    }
}