import { Request, Response, Router } from 'express';

import { IsAuthenticated, can, is } from './middlewares/index';
import {
    SessionController,
} from './controllers/SessionController';

import { createUserController } from './application/usecases/createUser';
import { createPermissionController } from './application/usecases/createPermission';
import { createRoleController } from './application/usecases/createRole';
import { registerUserPermissionController } from './application/usecases/registerUserPermission';
import { registerRolepermissionController } from './application/usecases/registerRolePermissions';
import { registerUserRolesController } from './application/usecases/registerUserRolesUsecase';

const routes = Router();

// routes.get('/users', new GetAllUsersController().handle);


routes.post('/login', new SessionController().handle);

// rotas de criar tabelas de pontas 

routes.post('/permissions', IsAuthenticated(), (req: Request, res: Response) => {
    return createPermissionController.handle(req, res);
});
routes.post('/users', (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});
routes.post('/roles', IsAuthenticated(), (req: Request, res: Response) => {
    return createRoleController.handle(req, res);
});

routes.post('/roles/rolePermissions', IsAuthenticated(), (req: Request, res: Response) => {
    return registerRolepermissionController.handle(req, res);
});


// routes.get('/users/roles', IsAuthenticated(), new UserController().handle);

// rotas de criar tabelas de registros de função

routes.post('/users/addPermission', IsAuthenticated(), (req: Request, res: Response) => {
    return registerUserPermissionController.handle(req, res);
});

routes.post('/users/addRole', IsAuthenticated(), (req: Request, res: Response) => {
    return registerUserRolesController.handle(req, res);
});


export { routes };