import { PrismaPermissionRepository } from '../../repositories/implementation/PrismaPermissionRepository';
import { CreatePermissionController } from './CreatePermissionController';
import { CreatePermissionUseCase } from './CreatePermissionUseCase';

const prismaPermissionRepository = new PrismaPermissionRepository();

const createPermissionUseCase = new CreatePermissionUseCase(prismaPermissionRepository);

const createPermissionController = new CreatePermissionController(
    createPermissionUseCase
);

export { createPermissionUseCase, createPermissionController };