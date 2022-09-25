import { PrismaRoleRepository } from '../../repositories/implementation/PrismaRoleRepository';
import { PrismaUserRolesRepository } from '../../repositories/implementation/PrismaUserRolesRepository';
import { PrismaUserRepository } from '../../repositories/implementation/PrismaUserRepository';

import { GetUserRolesUseCase } from './GetUserRolesUseCase';
import { GetUserRolesController } from './GetUserRolesController';

const prismaUserRepository = new PrismaUserRepository();
const prismaUserRolesRepository = new PrismaUserRolesRepository();
const prismaRoleRepository = new PrismaRoleRepository();

const getUserRolesUseCase = new GetUserRolesUseCase(
    prismaUserRepository,
    prismaUserRolesRepository,
    prismaRoleRepository
);
const getUserRolesController = new GetUserRolesController(
    getUserRolesUseCase
);

export { getUserRolesUseCase, getUserRolesController };