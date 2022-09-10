import { PrismaRoleRepository } from '../../repositories/implementation/PrismaRoleRepository';
import { PrismaPermissionRepository } from '../../repositories/implementation/PrismaPermissionRepository';
import { PrismaRolePermissionsRepository } from '../../repositories/implementation/PrismaRolePermissionsRepository';

import { RegisterRolePermissionsUseCase } from './RegisterRolePermissionsUseCase';
import { RegisterRolePermissionController } from './RegisterRolePermissionsController';

const roleRepository = new PrismaRoleRepository();
const permissionRepository = new PrismaPermissionRepository();
const rolePermissionsRepository = new PrismaRolePermissionsRepository();

const registerRolePermissionsUseCase = new RegisterRolePermissionsUseCase(
    roleRepository,
    permissionRepository,
    rolePermissionsRepository
);

const registerRolepermissionController = new RegisterRolePermissionController(registerRolePermissionsUseCase);

export { registerRolePermissionsUseCase, registerRolepermissionController };