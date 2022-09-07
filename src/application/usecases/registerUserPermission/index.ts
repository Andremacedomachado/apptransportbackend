import { PrismaPermissionRepository } from '../../repositories/implementation/PrismaPermissionRepository';
import { PrismaUserPermissionRepository } from '../../repositories/implementation/PrismaUserPermissionRepository';
import { PrismaUserRepository } from '../../repositories/implementation/PrismaUserRepository';
import { RegisterUserPermissionController } from './RegisterUserPermissionController';
import { RegisterUserPermissionUseCase } from './RegisterUserPermissionUseCase';


const prismaUserPermissionRepository = new PrismaUserPermissionRepository();
const prismaUserRepository = new PrismaUserRepository();
const prismaPermissionRepository = new PrismaPermissionRepository();

const registerUserPermissionUseCase = new RegisterUserPermissionUseCase(prismaUserRepository, prismaPermissionRepository, prismaUserPermissionRepository);
const registerUserPermissionController = new RegisterUserPermissionController(registerUserPermissionUseCase);
export { registerUserPermissionUseCase, registerUserPermissionController };