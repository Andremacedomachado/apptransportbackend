import { Request, Response } from 'express';
import { prisma } from '../database';



export class GetAllUsersController {
    async handle(request: Request, response: Response) {
        const users = await prisma.user.findMany();
        return response.send(users);
    }
}