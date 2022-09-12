import { PrismaRoleRepository } from '../../repositories/implementation/PrismaRoleRepository';
import { PrismaUserRepository } from '../../repositories/implementation/PrismaUserRepository';
import { PrismaUserRolesRepository } from '../../repositories/implementation/PrismaUserRolesRepository';

import { RegisterUserRolesController } from './RegisterUserRolesController';
import { RegisterUserRolesUseCase } from './RegisterUserRolesUseCase';

const prismaUserRepository = new PrismaUserRepository();
const prismaRoleRepository = new PrismaRoleRepository();
const prismaUserRolesRepository = new PrismaUserRolesRepository();

const registerUserRolesUseCase = new RegisterUserRolesUseCase(
    prismaUserRepository,
    prismaRoleRepository,
    prismaUserRolesRepository
);
const registerUserRolesController = new RegisterUserRolesController(registerUserRolesUseCase);

export { registerUserRolesUseCase, registerUserRolesController };