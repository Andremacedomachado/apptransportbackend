import { Request, Response, Router } from 'express';

import { IsAuthenticated, can, is } from './middlewares/index';
import {
    SessionController,
} from './controllers/SessionController';

import { createUserController } from './application/usecases/createUser';
import { createPermissionController } from './application/usecases/createPermission';

const routes = Router();

// routes.get('/users', new GetAllUsersController().handle);


routes.post('/login', new SessionController().handle);

// rolas de criar tabelas de pontas 
// routes.post('/roles', IsAuthenticated(), new CreateRoleController().handle);
routes.post('/permissions', IsAuthenticated(), (req: Request, res: Response) => {
    return createPermissionController.handle(req, res);
});
routes.post('/users', IsAuthenticated(), (req: Request, res: Response) => {
    return createUserController.handle(req, res);
});

// routes.get('/users/roles', IsAuthenticated(), new UserController().handle);

// routes.post('/roles/:roleId', IsAuthenticated(), is(['admin']), new CreateRolePermissionsController().handle);
// routes.post('/users/userroles', IsAuthenticated(), is(['super_admin']), new CreateUserRolesControler().handle);


export { routes };