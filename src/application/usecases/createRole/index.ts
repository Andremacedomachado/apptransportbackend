import { PrismaRoleRepository } from '../../repositories/implementation/PrismaRoleRepository';
import { CreateRoleController } from './CreateRoleController';
import { CreateRoleUseCase } from './CreateRoleUseCase';

const prismaRoleRepository = new PrismaRoleRepository();
const createRoleUseCase = new CreateRoleUseCase(prismaRoleRepository);
const createRoleController = new CreateRoleController(createRoleUseCase);

export { createRoleUseCase, createRoleController };