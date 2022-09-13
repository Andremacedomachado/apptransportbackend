import { PrismaUserRepository } from '../../repositories/implementation/PrismaUserRepository';

import { GetAllUsersController } from './GetAllUsersController';
import { GetAllUsersUseCase } from './GetAllUsersUseCase';

const prismaUserRepository = new PrismaUserRepository();

const getAllUsersUseCase = new GetAllUsersUseCase(prismaUserRepository);
const getAllUsersController = new GetAllUsersController(getAllUsersUseCase);

export { getAllUsersUseCase, getAllUsersController };